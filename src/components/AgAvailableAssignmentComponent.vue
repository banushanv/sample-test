<template>
  <div>
    <div>
    <div class="border-b border-dark-red-500  p-4 flex justify-center ">
    <h3 class="text-base font-semibold leading-6 text-dark-red-500">{{ translate('tid_vikar.available_assignments') }}</h3>
    </div>
  </div>
    <ul class="mt-2  mb-4  grid grid-cols-1 h-68-screen overflow-auto   sm:grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-8">
      <li
        v-for="client in clients"
        :key="client.id"
        class="overflow-hidden h-max  rounded-xl border bg-white border-gray-200"
      >
        <div class="flex justify-between gap-x-4 border-b border-gray-900/5 p-6">
          <div>
            <span class="flex items-center gap-x-2">
              <!-- <img
                  :src="client.imageUrl"
                  :alt="client.name"
                  class="h-8 w-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                /> -->

              <b class="text-2xl leading-6">{{ client.name }}</b>
            </span>
            <p class="mt-4 font-semibold truncate text-sm">{{dayjs(client.date).format('DD.MMM')}} {{ client.startTime }}</p>
            <p class="mb-2 truncate text-sm">{{ client.personName }}</p>
          </div>
          <div>
            <dt class="cursor-pointer pt-10">
              <button
                type="button"
                @click="onShowComment(client)"
                class="inline-flex rounded-lg bg-gray-100 px-2 py-2 text-center text-xs text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300"
              >
              {{translate('tid_vikar.my_assignments_tab.show_details')}}
              </button>
            </dt>
          </div>
        </div>

        <div v-if="client.isExpanded">
          <div class="gap-x-4 border-b border-gray-900/5 bg-gray-100 p-4">
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold">{{translate('tid_vikar.my_assignments_tab.org')}}: </span> Sandnes Stavanger
            </dd>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold"> {{translate('tid_vikar.my_assignments_tab.compensation')}}: </span>300 NOK
            </dd>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
              <span class="font-semibold"> {{translate('tid_vikar.my_assignments_tab.comment')}}: </span> {{ client.comment }}
            </dd>

            <span class="mt-6 flex items-center justify-center">
              <button
                type="button"
                @click="onTakeAssignment(client)"
                class="inline-flex rounded-md px-3 py-2 text-center text-sm font-semibold text-white bg-dark-red-500 shadow-sm ring-1 ring-inset ring-dark-red-500 hover:bg-red-800"
              >
              {{translate('tid_vikar.available_assignments_tab.take_assignment')}}
              </button>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <AgConfirmationDialogComponent
      @on-cancel-dialog="closeDialog()"
      @on-go-to-assignment="onChangeAssignment()"
      v-if="isConfirmationDialogVisible"
    >
    </AgConfirmationDialogComponent>
    <AgAlertDialogComponent
      v-if="isAlertDialogVisible"
      @on-cancel-alert-dialog="closeAlertDialog()"
    >
    </AgAlertDialogComponent>
  </div>
</template>

<script setup lang="ts">
import AgConfirmationDialogComponent from '@/components/dialogs/AgConfirmationDialogComponent.vue';
import AgAlertDialogComponent from '@/components/dialogs/AgAlertDialogComponent.vue';
import { ref } from 'vue';
import { translate } from "@/locales";
import dayjs from 'dayjs';

const emit = defineEmits(['on-change-to-assignment']);
const isConfirmationDialogVisible = ref(false);
const isAlertDialogVisible = ref(false);
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
  }
]) as any;

const onTakeAssignment = (client: any) => {
  if (client.isTaken) {
    isAlertDialogVisible.value = true;
  } else {
    isConfirmationDialogVisible.value = true;
  }
};
const closeDialog = () => {
  isConfirmationDialogVisible.value = false;
};

const closeAlertDialog = () => {
  isAlertDialogVisible.value = false;
};

const onChangeAssignment = () => {
  emit('on-change-to-assignment');
};

const onShowComment = (client: any) => {
  if (client.comment !== ' ') {
    client.isExpanded = !client.isExpanded;
  }
};
</script>
