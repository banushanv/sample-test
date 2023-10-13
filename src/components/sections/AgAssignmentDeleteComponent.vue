<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10">
        <div
          class="flex min-h-full items-end justify-center py-20 px-4 text-center sm:items-center sm:p-10"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-12 pb-2 pt-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class=" py-6 border-b border-gray-200 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dd class="font-semibold text-base leading-6  sm:col-span-4 sm:mt-0">
                    <span> {{ translate('tid_vikar.my_assignments_tab.delete_dialog.dialog_heading') }}</span> 
                    </dd>
                  </div>
              <div class="absolute right-0 top-0 pr-3 pt-3 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon @click="onCancelDialog()" class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <form class="h-68-screen  overflow-auto  sm:h-full">
              <div class="mt-1">
                <div class="py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dd class="mt-1   text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                    <span>{{ translate('tid_vikar.my_assignments_tab.delete_dialog.return_list') }}</span> 
                    </dd>
                  </div>
                <dt class="divide-y divide-gray-300">
                  <div class=" py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.date') }}</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      11.02.2023
                    </dd>
                  </div>
                  <div class=" py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.time') }}</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      11.00 - 02.00
                    </dd>
                  </div>
                  <div class=" py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.place') }}</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Johanes Kirken
                    </dd>
                  </div>
                  <div class="py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.organization') }}</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Sandness,Stavanger
                    </dd>
                  </div>
                  <div>
                    <Listbox as="div" v-model="selected">
                      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                        >{{ translate('tid_vikar.my_assignments_tab.delete_dialog.reason') }}</ListboxLabel
                      >
                      <div class="relative mt-1">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-600 sm:text-sm sm:leading-6"
                        >
                          <span class="block truncate">{{ selected.name }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition ease-in duration-100"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-0 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              as="template"
                              v-for="person in people"
                              :key="person.id"
                              :value="person"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-red-300  text-black' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ person.name }}</span
                                >

                                <span
                                  v-if="selected"
                                  :class="[
                                    active ? 'text-black' : 'text-red-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  ]"
                                >
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </dt>
                <dt>
                  <div>
                    <label for="comment" class=" block text-sm font-medium leading-6 text-gray-900"
                      >{{ translate('tid_vikar.my_assignments_tab.delete_dialog.other_reason') }}</label
                    >
                    <div class="mt-1 pb-16">
                      <textarea
                        rows="4"
                        name="comment"
                        id="comment"
                        class="block w-full h-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark-red-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </dt>
                <div class="relative bottom-12 inset-x-0 bg-white p-3 flex justify-between gap-4">

                  <button
                    type="button"
                    class="flex w-full items-center justify-center gap-3 rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-dark-red-500 shadow-sm ring-1 ring-inset ring-dark-red-500 hover:bg-red-300"
                    @click="onCancelDialog()"
                    ref="cancelButtonRef"
                  >
                  {{ translate('tid_vikar.common.cancel') }}
                  </button>
                  
                  <button
                    type="button"
                    class="flex w-full items-center justify-center gap-3 rounded-md bg-dark-red-500 px-3 py-2 text-sm font-semibold 
                    text-white shadow-sm hover:bg-red-800 border border-dark-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    @click="onGoToMyAssignment()"
                  >
                  {{ translate('tid_vikar.common.ok') }}
                  </button>
              
                </div>
              </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { translate } from "@/locales";
import { XMarkIcon } from '@heroicons/vue/20/solid';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['on-cancel-dialog', 'on-delete-assignment']);
const open = ref(true);
const people = [
  { id: 1, name: 'Absence' },
  { id: 2, name: 'Sick' },
  { id: 3, name: 'Parental Leave' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' }
];

const selected = ref(people[2]);

const onCancelDialog = () => {
  emit('on-cancel-dialog');
};

const onGoToMyAssignment = () => {
  emit('on-delete-assignment');
};
</script>
