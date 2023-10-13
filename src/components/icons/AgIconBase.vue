<template>
  <div class="iconBase">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="viewBox"
      :aria-labelledby="iconName"
      role="presentation"
      @mouseover="isHoverValue = true"
      @mouseout="isHoverValue = false"
      style="enable-background: new 0 0 24 24"
    >
      <!-- <title :id="iconName" lang="en">{{title}}</title> -->
      <g :fill="isHoverValue ? iconHoverColor : iconColor">
        <slot />
      </g>
    </svg>
    <!-- <span class="base-name">{{name}}</span> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AgIconBase",
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: String,
      default: "18"
    },
    height: {
      type: String,
      default: "18"
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    iconHoverColor: {
      type: String,
      default: "currentColor"
    },
    viewBox: {
      type: String,
      default: "0 0 24 24"
    },
    isHover: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    name: {
      type: String
    }
  },
  setup(props) {
    const isHoverValue = ref(props.isHover);

    return {
      isHoverValue
    };
  }
});
</script>


