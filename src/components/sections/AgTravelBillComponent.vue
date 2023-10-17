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
         class="flex left-0 top-0 w-full items-end justify-center h-full  text-center sm:items-center sm:p-10"
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
              class="relative overflow-hidden h-full w-full transform  rounded-lg bg-white px-4 pb-4 pt-20 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:h-auto sm:max-w-lg sm:p-6"
            >
              <div
                  class="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0"
              >
                <dd class="mt-1 font-semibold text-base leading-6 sm:col-span-4 sm:mt-0">
                  <span>  {{ translate('tid_vikar.my_assignments_tab.travel_bill_dialog.header') }}</span>
                </dd>
              </div>
       
    
              <form class="h-68-screen  overflow-auto  sm:h-full">
                <div class="mt-2">
                  <dt class="divide-y divide-gray-300">
                    <div class="px-2 py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.date') }}</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        11.02.2023
                        <div class="w pb-1/2 bg-purple-300"></div>
                      </dd>
                    </div>
                    <div class="px-2 py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.time') }}</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        11.00 - 02.00
                      </dd>
                    </div>
                    <div class="px-2 py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.place') }}</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Johanes Kirken
                      </dd>
                    </div>
                    <div class="px-2 py-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">{{ translate('tid_vikar.my_assignments_tab.delete_dialog.organization') }}</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Sandness,Stavanger
                      </dd>
                    </div>
                  </dt>
                  <div class="mt-4 flex w-64 gap-x-6">
                    <button
                      type="button"
                      @click="onAddTripForm"
                      class="inline-flex justify-center rounded-md w-1/2 bg-white px-2 py-2 text-center text-sm lg:max-xl:text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100"
                    >
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                      {{ translate('tid_vikar.my_assignments_tab.travel_bill_dialog.add_trip') }}
                    </button>

                    <button
                      type="button"
                      @click="onAddOutlayForm"
                      class="inline-flex justify-center rounded-md w-1/2 bg-white px-2 py-2 text-center text-sm lg:max-xl:text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100"
                    >
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                     Add Outlay
                    </button>
                  </div>

                  <div class="px-4 py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div class="relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            class="h-4 w-4 cursor-pointer rounded border-gray-300 text-dark-red-500 focus:ring-dark-red-500"
                          />
                        </div>
                        <div class="ml-2 text-sm leading-6">
                          <span id="comments-description" class="text-gray-700"
                            >  {{ translate('tid_vikar.my_assignments_tab.travel_bill_dialog.without_bill') }}</span
                          >
                        </div>
                      </div>

                      <div>
                        <ul role="list" class="divide-y divide-gray-300">
                          <li
                            v-for="trip in tripDetails"
                            :key="trip.id"
                            class="flex items-center justify-between gap-x-6 py-4"
                          >
                            <div class="flex gap-x-4">
                              <div
                                class="h-11 w-11 flex-none flex items-center justify-center bg-red-100 rounded-md text-sm"
                              >
                                {{ trip.vehicleType.name }}
                              </div>
                              <div >
                                <div
                                  class="text-sm grid grid-cols-2 md:gap-x-64 gap-x-36"
                                >
                                  <span>{{trip.date}}</span>
                                  <span class="text-xs">{{ trip.toll }} Nok </span>
                                </div>

                                <div class="flex text-sm justify-between gap-x-8 sm:w-auto">
                                  <span>{{ trip.from + ' - ' + trip.to }}</span>
                                  <div   class="grid grid-cols-2 gap-2">
                                    <span @click="onEditTripForm(trip)">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-4 h-4 cursor-pointer"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 
                                        1.13L6  18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                  </span>
                                  <span @click="onRemoveTripForm(trip)">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-4 h-4 cursor-pointer">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 
                                   2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 
                                   013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                   </svg>
                                   </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </dd>
                    <span class="flex justify-end" v-if="tripDetails.length>0">SUM: {{ calculateCost }} NOK</span>
                  </div>

              
                </div>
                <div class="fixed bottom-0 inset-x-0 bg-white p-4 flex justify-between gap-4">
                <button
                      type="button"
                      class="flex w-full items-center justify-center gap-3 rounded-md bg-red-200 px-1 py-2 text-sm font-semibold text-dark-red-500 shadow-sm ring-1 ring-inset ring-dark-red-500 hover:bg-red-300"
                      @click="onCancelDialog()"
                      ref="cancelButtonRef"
                    >
                    {{ translate('tid_vikar.common.cancel') }}
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center justify-center gap-3 rounded-md bg-dark-red-500 px-1 py-2 
                      text-sm font-semibold text-white shadow-sm hover:bg-red-800 border border-dark-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 "
                      @click="onConfirmTravelExpense()"
                    >
                    {{ translate('tid_vikar.common.submit') }}
                    </button>
               
                  </div>
              </form>
            
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <AgTravelTripFormComponent
    v-if="isTripFormVisible"
    @on-add-trip-items="addTravelItems"
    :isEdit="isEdit"
    :selectedTripForm="selectedTripForm"
    @on-cancel-trip-form="cancelTripForm()"
  >
  </AgTravelTripFormComponent>
  <AgOutlayComponent
    v-if="isOutlayFormVisible"
    @on-add-trip-items="addTravelItems"
    :isEdit="isEdit"
    :selectedTripForm="selectedTripForm"
    @on-cancel-trip-form="cancelOutlayForm()"
  >
  </AgOutlayComponent>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { PlusIcon } from '@heroicons/vue/20/solid';
import AgTravelTripFormComponent from '@/components/sections/AgTravelTripFormComponent.vue';
import AgOutlayComponent from '@/components/sections/AgOutlayComponent.vue';
import type TripForm from '@/models/TripForm';
import { translate } from "@/locales";

const emit = defineEmits(['on-form-cancel-dialog']);
const isTripFormVisible = ref(false);
const isOutlayFormVisible = ref(false);
const open = ref(true);
const isEdit=ref(false);
const tripDetails = ref([] as TripForm[]);
const selectedTripForm=ref({} as TripForm);


const onCancelDialog = () => {
  emit('on-form-cancel-dialog');
};

const onConfirmTravelExpense = () => {
  //
};

const onAddTripForm = () => {
  isTripFormVisible.value = true;
  isEdit.value=false;
};


const onAddOutlayForm=()=>{
  isOutlayFormVisible.value = true;
  isEdit.value=false;
};

const onEditTripForm=(tripForm: TripForm)=>{
  isTripFormVisible.value = true;
  selectedTripForm.value=tripForm;
  isEdit.value=true;
};

const onRemoveTripForm=(tripForm: TripForm)=>{
    const index=tripDetails.value.findIndex((a: TripForm)=>a.id===tripForm.id);
        if(index!==-1){
          tripDetails.value.splice(index,1);
     }
    };

const cancelTripForm = () => {
  isTripFormVisible.value = false;
};

const cancelOutlayForm = () => {
  isOutlayFormVisible.value = false;
};

const addTravelItems = (travelItem: TripForm) => {
  if(!isEdit.value){
       tripDetails.value.push(travelItem);
   }
  isTripFormVisible.value = false;
};

const calculateCost = computed(() => {
  if (tripDetails.value.length > 0) {
    let sum = 0;
    tripDetails.value.forEach((item: TripForm) => {
      sum += +item.toll;
    });
    return sum;
  } else {
    return 0;
  }
});
</script>
