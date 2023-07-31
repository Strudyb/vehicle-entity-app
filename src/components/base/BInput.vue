<template>
  <div class="b-input">
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :style="inputStyle"
      :max="max"
      :min="min"
      :disabled="disabled"
      :class="{ 'has-error': inputValidations[0] }"
      @input="handleInputUpdate"
    />
    <span v-if="inputValidations.length" class="validation-message">
      {{ inputValidations[0].message }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "Enter your text...",
    },
    size: {
      type: String,
      default: "medium",
    },
    borderColor: {
      type: String,
      default: "#ccc",
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
  },

  computed: {
    inputStyle() {
      const pixelsBySizeName = {
        small: "150px",
        medium: "200px",
        large: "300px",
        full: "100%",
      };

      return {
        width: pixelsBySizeName[this.size],
        height: "40px",
        borderRadius: "8px",
        border: `1px solid ${this.borderColor}`,
        paddingLeft: "16px",
        fontSize: "16px",
      };
    },
    inputValidations() {
      const validations = [
        {
          condition: this.type === "number" && Number(this.value) > this.max,
          message: `Value can not be greater than ${this.max}`,
        },
        {
          condition: this.type === "number" && Number(this.value) < this.min,
          message: `Value can not be lower than ${this.min}`,
        },
      ];

      return validations.filter(({ condition }) => condition);
    },
  },

  methods: {
    handleInputUpdate(event) {
      const value =
        this.type === "number"
          ? Number(event.target.value)
          : event.target.value;
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss">
.b-input {
  display: inline-block;

  .has-error {
    border-color: red !important;
  }

  .validation-message {
    font-size: 10px;
    color: red;
  }
}
</style>
