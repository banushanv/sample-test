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

      <div class="fixed inset-0 z-10 ">
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
              class="relative overflow-hidden w-full h-full transform  rounded-lg bg-white px-4 pb-4 pt-20 text-left shadow-xl transition-all sm:mt-16 sm:mb-2  sm:w-full  sm:max-w-lg sm:p-6"
            >
              <div
                class="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0"
              >
                <dd class="mt-1 font-semibold text-base leading-6 sm:col-span-4 sm:mt-0">
                  <span>{{
                    translate('tid_vikar.my_assignments_tab.travel_bill_dialog.trip')
                  }}</span>
                </dd>
              </div>
           
              <form class="h-68-screen overflow-auto ">
             
                <div class="mt-2" >
                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{ translate('tid_vikar.my_assignments_tab.delete_dialog.date') }}</label
                        >
                        <div class="mt-1">
                          <LocalizationProvider :language="locale">
                            <IntlProvider :locale="getLocale(locale)">
                              <DatePicker 
                              class="w-full" 
                              :value="dateRef" 
                              :week-number="true"
                              @change="handleChange"
                              />
                            </IntlProvider>
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{
                            translate('tid_vikar.my_assignments_tab.travel_bill_dialog.mode_travel')
                          }}</label
                        >
                        <div class="mt-1">
                          <Listbox as="div" v-model="tripModel.vehicleType">
                            <div class="relative mt-2">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-600 sm:text-sm sm:leading-6"
                              >
                                <span class="block truncate">{{ tripModel.vehicleType.name }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <ChevronUpDownIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
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
                                    v-for="person in vehicleTypes"
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
                      </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{
                            translate('tid_vikar.my_assignments_tab.travel_bill_dialog.travel_from')
                          }}</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            v-model="tripModel.from"
                            autocomplete="street-address"
                            class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{
                            translate('tid_vikar.my_assignments_tab.travel_bill_dialog.travel_to')
                          }}</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            v-model="tripModel.to"
                            autocomplete="street-address"
                            class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="relative flex items-start">
                       
                       <div class="flex h-6 items-center">
                         <input id="comments" aria-describedby="comments-description"  v-model="tripModel.isTrip" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-dark-red-500 focus:ring-dark-red-500" />
                       </div>
                       <div class="ml-3 text-sm leading-6">
                     <label for="comments" class="font-medium text-gray-900">Tur/Retur</label>
                     
                        </div>
                     </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{
                            translate('tid_vikar.my_assignments_tab.travel_bill_dialog.distance')
                          }}</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autocomplete="street-address"
                            v-model="tripModel.distance"
                            class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >{{
                            translate('tid_vikar.my_assignments_tab.travel_bill_dialog.tolls')
                          }}</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="tolls"
                            id="tolls"
                            v-model="tripModel.toll"
                            autocomplete="tolls"
                            class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <ul role="list" >
                          <li
                            v-for="passengerItem in tripModel.passengers"
                            :key="passengerItem.id"
                            class="flex items-center justify-between gap-x-4 py-2"
                          >
                          <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Passenger Name</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="tolls"
                            id="tolls"
                            autocomplete="tolls"
                            class="block w-72 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Km</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="tolls"
                            id="tolls"
                            autocomplete="tolls"
                            class="block w-24 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                         <div class="mt-6" @click="onRemovePassenger(passengerItem)">
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
                                  </div>
                              </li>
                              </ul>
                              </div>

                <div class="col-span-full">
                  <div class="mt-4 flex w-64 ">
                    <button
                      type="button"
                      @click="onAddPassengers()"
                      class="inline-flex justify-center rounded-md w-3/5 bg-white px-2 py-2 text-center text-sm lg:max-xl:text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100"
                    >
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                      Add Passengers
                    </button>
                  </div>
                  
                    </div>

                    <div class="col-span-full ">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Sum (NOK)</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            name="tolls"
                            id="tolls"
                            v-model="tripModel.sum"
                            autocomplete="tolls"
                            class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
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
                    class="flex w-full items-center justify-center gap-3 rounded-md bg-dark-red-500 px-1 py-2 text-sm 
                    font-semibold text-white shadow-sm hover:bg-red-800 border border-dark-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 "
                    @click="onConfirmTravelExpense()"
                  >
                    {{
                      props.isEdit
                        ? translate('tid_vikar.common.update')
                        : translate('tid_vikar.my_assignments_tab.travel_bill_dialog.add')
                    }}
                  </button>
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
import { onMounted, ref, type PropType } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { DatePicker } from '@progress/kendo-vue-dateinputs';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { v4 as uuidv4 } from 'uuid';
import { useI18n } from 'vue-i18n';
import { PlusIcon } from '@heroicons/vue/20/solid';
import TripForm from '@/models/TripForm';
import { translate } from '@/locales';
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-vue-intl';
import weekData from 'cldr-core/supplemental/weekData.json';
import norwegianCaGregorian from 'cldr-dates-full/main/nb/ca-gregorian.json';
import swedishCaGregorian from 'cldr-dates-full/main/sv/ca-gregorian.json';
import nbDateFields from 'cldr-dates-full/main/nb/dateFields.json';
import type { DatePickerChangeEvent } from 'node_modules/@progress/kendo-vue-dateinputs/dist/npm/datepicker/interfaces/DatePickerEventArguments';
import Passenger from '@/models/Passenger';

load(weekData, norwegianCaGregorian, swedishCaGregorian, nbDateFields);

const props = defineProps({
  isEdit: {
    required: true,
    type: Boolean
  },
  selectedTripForm: {
    required: true,
    type: Object as PropType<TripForm>
  }
});

const emit = defineEmits(['on-cancel-trip-form', 'on-add-trip-items']);
const open = ref(true);
const tripModel = ref( new TripForm() );
const esMessages = { calendar: { today: translate('common.today') } };
const { locale } = useI18n({ useScope: 'global' });
const dateRef=ref(new Date());
const dateValue = ref(
  new Date().toLocaleDateString('no-NO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
);
const vehicleTypes = [
  { id: 1, name: 'Car' },
  { id: 2, name: 'Bus' },
  { id: 3, name: 'Boat' },
  { id: 4, name: 'Train' },
  { id: 5, name: 'Bike' }
];
loadMessages(esMessages, locale.value);


onMounted(() => {
  if (!props.isEdit) {
    tripModel.value.id = uuidv4();
    tripModel.value.date = dateValue.value;
    tripModel.value.vehicleType = vehicleTypes[0];
  } else {
    tripModel.value = props.selectedTripForm;
  }
});

const onCancelDialog = () => {
  emit('on-cancel-trip-form');
};

const getLocale = (locale: any) => {
  switch (locale) {
    case 'no':
      return 'nb';
    case 'nn':
      return 'nb';
    case 'se':
      return 'sv';
    default:
      return 'en';
  }
};

const onConfirmTravelExpense = () => {
  if (
    tripModel.value.date &&
    tripModel.value.distance &&
    tripModel.value.from &&
    tripModel.value.to &&
    tripModel.value.vehicleType &&
    tripModel.value.toll
  )
    emit('on-add-trip-items', tripModel.value);
};

const onAddPassengers=()=>{
  const newPassenger= new Passenger();
  newPassenger.distance="";
  newPassenger.name="";
  newPassenger.id=uuidv4();
  tripModel.value.passengers.push(newPassenger);
};

const onRemovePassenger=(passenger: Passenger)=>{
  const index=tripModel.value.passengers.findIndex((a: Passenger)=>a.id===passenger.id);
        if(index!==-1){
          tripModel.value.passengers.splice(index,1);
     }
};

const  handleChange=(event: DatePickerChangeEvent)=> {
    dateRef.value = new Date((event.target.value));
  };
</script>
