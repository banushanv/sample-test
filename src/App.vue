
<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Constants from "@/utils/constants";
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';

const serverLocationLanguage=() =>{
  const countryCode = `${import.meta.env.VITE_APP_TID_COUNTRY_CODE}`;
  let lang = "nb";
  if (countryCode === Constants.ApplicationConstants.CountryCodes.Norway) {
    lang ='nb';
  } 
  else{
    lang ='en';
  }
  dayjs.locale(lang);
};

serverLocationLanguage();

</script>

