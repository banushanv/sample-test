<template>
  <div>
    <header class="bg-white">
    <div class="lg:pl-70">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-dark-red-500 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >   
        <div class="flex h-16 shrink-0 items-center">
          <span class="w-auto p-2.5 text-white">{{translate('tid_vikar.vikar')}}</span>
        </div>
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="relative flex flex-1" action="#" method="GET"></form>

          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="inline-flex items-center">
              <!-- Use the button class to style the button -->

              <!-- Use the hero-icon component to render the icon -->
              <span @click="logoutHandler()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="w-5 h-5 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <main class="py-1 bg-red-50 ">
        <div class="px-4 sm:px-6 lg:pr-0 ">
          <component
            class="pb-16 lg:pr-6"
            @on-change-to-assignment="onRouteToMyAssignment()"
            :is="changeMenu()"
          ></component>
        </div>
      </main>
    </div></header>
    <!-- Static sidebar for desktop -->
    <footer class="bg-gray-900 border-b border-gray-300" aria-labelledby="footer-heading">
      <!-- <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile-->
      <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow p-2">
        <div id="tabs" class="flex justify-center gap-x-10">
          <a
            :href="item.href"
            :class="[
              item.current
                ? 'bg-dark-red-50 text-dark-red-500'
                : 'text-grey-700 hover:text-dark-red-500 hover:bg-red-100',
              'group  rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer justify-center inline-block text-center pt-2 pb-1'
            ]"
            v-for="item in navigation"
            :key="item.name"
            @click="onMenuSelectHandler(item)"
          >
            <component
              :is="item.icon"
              :class="[
                item.current
                  ? 'text-dark-red-500'
                  : 'text-grey-700 group-hover:text-dark-red-500',
                'h-6 w-6 shrink-0 justify-center inline-block text-center'
              ]"
              aria-hidden="true"
            />
            <span class="tab tab-home block"> {{ item.name }}</span>
          </a>
        </div>
      </section>
   </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {BriefcaseIcon, UserIcon, HomeIcon } from '@heroicons/vue/24/outline';
import AgMyAssignmentComponent from '@/components/AgMyAssignmentComponent.vue';
import router from '@/router';
import AgPersonInformationComponent from '@/components/AgPersonInformationComponent.vue';
import AgAvailableAssignmentComponent from '@/components/AgAvailableAssignmentComponent.vue';
import { translate } from "@/locales";

const TabsTypes = ref(0);
const navigation = ref([
  { name: translate('tid_vikar.my_assignments'), icon: HomeIcon, current: true, id: 0 },
  { name: translate('tid_vikar.assignments'), icon: BriefcaseIcon, current: false, id: 2 },
  { name: translate('tid_vikar.about_me'), icon: UserIcon, current: false, id: 1 }
]) as any;

const logoutHandler = async () => {
  router.push('/');
};
;

const onMenuSelectHandler = (item: any) => {
  navigation.value.forEach((element: any) => {
    element.current = false;
  });
  TabsTypes.value = item.id;
  item.current = true;
};

const changeMenu: any = () => {
  switch (TabsTypes.value) {
    case 0:
      return AgMyAssignmentComponent;
    case 1:
      return AgPersonInformationComponent;
    case 2:
      return AgAvailableAssignmentComponent;

    default:
      break;
  }
};
const onRouteToMyAssignment = () => {
  TabsTypes.value = 0;
  changeMenu();
  navigation.value.forEach((element: any) => {
    element.current = false;
  });
  navigation.value[0].current = true;
};
</script>
