<template>
  <div>
    <div class="border-b border-dark-red-500  p-4 flex justify-center ">
    <h3 class="text-base font-semibold leading-6 text-dark-red-500">{{translate('tid_vikar.my_assignments')}}</h3>
  </div>
    <ul
      role="list"
      class="mt-2  mb-4  grid grid-cols-1 h-68-screen overflow-auto   sm:grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-8"
    >
      <li
        v-for="client in clients"
        :key="client.id"
        class="overflow-hidden rounded-xl h-max border bg-white border-gray-200 "
      >
        <div class="flex justify-between gap-x-4 border-b border-gray-900/5 p-6">
          <div>
            <b class="text-2xl lg:max-xl:text-2xl">{{dayjs(client.date).format('DD.MMM')}}   </b>
            <p class="mt-4 font-semibold truncate text-sm">{{ client.startTime }} {{ client.name }}</p>
            <p class="mb-2 truncate text-sm">{{client.personName}}</p>
           
          </div>

          <div>
            <p :class="client.statusColor">{{client.status}}</p>
            
            <p class="text-gray-700 underline flex justify-end text-sm cursor-pointer mt-10" @click="onShowComment(client)">
              {{translate('tid_vikar.my_assignments_tab.show_details')}}
            </p>
   
          </div>
        </div>
        <div v-if="client.isExpanded">
          <div class="gap-x-4 border-b border-gray-900/5 bg-gray-100 p-4">
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold"> {{translate('tid_vikar.my_assignments_tab.org')}}: </span> Sandnes Stavanger
            </dd>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold">{{translate('tid_vikar.my_assignments_tab.compensation')}} : </span>300 NOK
            </dd>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold"> {{translate('tid_vikar.my_assignments_tab.comment')}}: </span> {{ client.comment }}
            </dd>

            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-dark-red-500 px-1 py-2 text-sm 
                font-semibold text-white shadow-sm hover:bg-red-800 border border-dark-red-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                @click="onTravelExpenseConfirm()"
                ref="cancelButtonRef"
              >
              {{ translate('tid_vikar.my_assignments_tab.travel_bill') }} 
              </button>

              <button
                type="button"
                @click="onConfirmAssignment(client.id)"
                class="mt-2 inline-flex w-full justify-center rounded-md bg-red-200 px-1 py-2 text-sm font-semibold text-dark-red-500 shadow-sm ring-1 ring-inset ring-dark-red-500 hover:bg-red-300 sm:col-start-1 sm:mt-0"
              >
               {{ translate('tid_vikar.my_assignments_tab.delete') }}
              </button>
            </div>
            <span class="mt-6 flex items-center justify-center"> </span>
          </div>
        </div>
      </li>
    </ul>
    <AgAssignmentDeleteComponent
      @on-cancel-dialog="closeDialog()"
      @on-delete-assignment="onDeleteAssignment()"
      v-if="isConfirmationDialogVisible"
    >
    </AgAssignmentDeleteComponent>
    <AgTravelBillComponent v-if="travelConfirmed" @on-form-cancel-dialog="onFormCancel()">
    </AgTravelBillComponent>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import AgAssignmentDeleteComponent from '@/components/sections/AgAssignmentDeleteComponent.vue';
import AgTravelBillComponent from '@/components/sections/AgTravelBillComponent.vue';
import { translate } from "@/locales";
import dayjs from 'dayjs';

const isConfirmationDialogVisible = ref(false);
const travelConfirmed = ref(false);
const selectedAssignmentId=ref(0);

const clients = ref([
  {
    id: 1,
    name: translate('tid_vikar.my_assignments_tab.wedding'),
    imageUrl: 'src/assets/images/wedding.png',
    isExpanded: false,
    comment: '',
    date: '2023-12-31',
    isTaken: false,
    status:translate('tid_vikar.my_assignments_tab.approved'),
    startTime: '09:00',
    personName:'Johanes Kirken',
    statusColor:'rounded-md  bg-green-600/10 px-5 py-1 text-xs font-semibold'
  },

  {
    id: 2,
    name: translate('tid_vikar.my_assignments_tab.funeral'),
    imageUrl: 'src/assets/images/grave.png',
    isExpanded: false,
    comment: '',
    date: '2023-11-24',
    isTaken: true,
    startTime: '12:00',
    personName:'Andersson Nilsson',
    status:translate('tid_vikar.my_assignments_tab.travel_bill_missing'),
    statusColor:'rounded-md bg-red-600/20 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 3,
    name: translate('tid_vikar.my_assignments_tab.religious'),
    imageUrl: 'src/assets/images/fashion.png',
    isExpanded: false,
    date: '2023-02-12',
    comment: 'Excepteur qui ipsum aliquip consequat sint',
    isTaken: false,
    startTime: '11:00',
    personName:'Anders Peter',
    status:translate('tid_vikar.my_assignments_tab.waiting_for_approval'),
    statusColor:'rounded-md bg-indigo-600/10 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 4,
    name: translate('tid_vikar.my_assignments_tab.funeral'),
    imageUrl: 'src/assets/images/grave.png',
    isExpanded: false,
    comment: '',
    date: '2023-08-22',
    startTime: '01:00',
    personName:'Andersson Peter',
    isTaken: true,
    status: translate('tid_vikar.my_assignments_tab.complete'),//'Goals to do',
    statusColor:'rounded-md bg-indigo-600/20 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 5,
    name: translate('tid_vikar.my_assignments_tab.religious'),
    imageUrl: 'src/assets/images/fashion.png',
    isExpanded: false,
    comment: '',
    date: '2023-04-29',
    startTime: '21:00',
    personName:'Karl Peter',
    isTaken: true,
    status:translate('tid_vikar.my_assignments_tab.waiting_for_approval'),
    statusColor:'rounded-md bg-indigo-600/10 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 6,
    name: translate('tid_vikar.my_assignments_tab.wedding'),
    imageUrl: 'src/assets/images/wedding.png',
    isExpanded: false,
    date: '2023-01-12',
    comment: 'Excepteur qui ipsum aliquip consequat sint',
    isTaken: false,
    status:translate('tid_vikar.my_assignments_tab.approved'),
    personName:'Per Svensson',
    startTime: '12:00',
    statusColor:'rounded-md bg-green-600/10 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 7,
    name: translate('tid_vikar.my_assignments_tab.funeral'),
    imageUrl: 'src/assets/images/grave.png',
    isExpanded: false,
    comment: '',
    date: '2023-01-29',
    isTaken: false,
    startTime: '06:00',
    personName:'Ola Olsson',
    status:translate('tid_vikar.my_assignments_tab.waiting_for_approval'),
    statusColor:'rounded-md bg-indigo-600/10 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 8,
    name: translate('tid_vikar.my_assignments_tab.wedding'),
    imageUrl: 'src/assets/images/wedding.png',
    isExpanded: false,
    comment: '',
    date: '2023-11-12',
    isTaken: false,
    startTime: '12:00',
    personName:'Nils Nilsson',
    status:translate('tid_vikar.my_assignments_tab.approved'),
    statusColor:'rounded-md bg-green-600/10 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 9,
    name: translate('tid_vikar.my_assignments_tab.religious'),
    imageUrl: 'src/assets/images/fashion.png',
    isExpanded: false,
    comment: '',
    date: '2023-11-28',
    startTime: '11:00',
    isTaken: true,
    status: translate('tid_vikar.my_assignments_tab.complete'),
    personName:'Erik Nilsson',
    statusColor:'rounded-md bg-indigo-600/20 px-5 py-1 text-xs font-semibold'
  },
  {
    id: 10,
    name: translate('tid_vikar.my_assignments_tab.funeral'),
    imageUrl: 'src/assets/images/grave.png',
    isExpanded: false,
    comment: '',
    date: '2023-07-28',
    startTime: '06:00',
    personName:'Thomas Johansson',
    isTaken: false,
    status:translate('tid_vikar.my_assignments_tab.travel_bill_missing'),
    statusColor:'rounded-md bg-red-600/20 px-5 py-1 text-xs font-semibold'
  }
]) as any;

const onConfirmAssignment = (id: number) => {
  selectedAssignmentId.value=id;
  isConfirmationDialogVisible.value = true;
};
const closeDialog = () => {
  isConfirmationDialogVisible.value = false;
};

const onDeleteAssignment = () => {
  if(selectedAssignmentId.value){
     const index= clients.value.findIndex((a: any)=>a.id===selectedAssignmentId.value);
     if(index!==-1){
        clients.value.splice(index,1);
        isConfirmationDialogVisible.value = false;
     }    
  }
};
const onShowComment = (client: any) => {
  if (client.comment !== ' ') {
    client.isExpanded = !client.isExpanded;
  }
};
const onTravelExpenseConfirm = () => {
  travelConfirmed.value = true;
};

const onFormCancel = () => {
  travelConfirmed.value = false;
};
</script>
