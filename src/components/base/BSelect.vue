<template>
  <div class="b-select">
    <select :value="selectedValue" @input="updateSelectedValue" :style="inputStyle">
      <option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    size: {
      type: String,
      default: "medium",
    },
  },

  data() {
    return {
      selectedValue: this.value,
    };
  },

  computed: {
    inputStyle() {
      const widths = {
        small: "150px",
        medium: "200px",
        large: "300px",
        full: "100%",
      };

      return {
        width: widths[this.size]
      };
    },
  },

  methods: {
    updateSelectedValue(event) {
      this.selectedValue = event.target.value;
      this.$emit("input", this.selectedValue);
    },
  },

  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    },
  },
};
</script>

<style>
.b-select select {
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
}
</style>
