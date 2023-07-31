<template>
  <div :id="groupName" class="radio-group" role="radiogroup">
    <label
      v-for="(option, index) in options"
      :key="option.value"
      :for="`${groupName}-${option.value}`"
      class="custom-radio"
      :class="{ disabled: option.disabled }"
    >
      <input
        :id="`${groupName}-${option.value}`"
        type="radio"
        role="radio"
        :tabindex="index === 0 ? '0' : '-1'"
        :name="groupName"
        :value="option.value"
        :checked="option.value === $attrs.value"
        :disabled="option.disabled"
        v-bind="$attrs"
        @input="$emit('update', option.value)"
        v-on="$listeners"
      />

      {{ option.label }}
      <span
        v-if="hasPreview"
        :style="`background-color: ${option.value}`"
        class="color-preview"
      ></span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    event: "update",
  },
  props: {
    groupName: {
      type: String,
      default: "radio-group" + String(Math.floor(Math.random() * 10)),
    },
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: [String, Number],
      default: null,
    },
    hasPreview: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.radio-group {
  .color-preview {
    display: inline-flex;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
}
</style>
