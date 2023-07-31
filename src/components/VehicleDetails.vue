<template>
  <div class="vehicle-details">
    <template v-if="isLoading">
      <BLoader />
    </template>

    <template v-else>
      <h3 class="vehicle-details-title">Vehicle Details</h3>

      <form class="vehicle-details-form" @submit.prevent>
        <div class="vehicle-details-form-row">
          <label>Id</label>
          <BInput v-model="vehicle.id" type="text" size="full" disabled />
        </div>

        <div class="vehicle-details-form-row">
          <label>Make</label>
          <BInput v-model="vehicle.make" type="text" size="full" disabled />
        </div>

        <div class="vehicle-details-form-row">
          <label>Model</label>
          <BInput v-model="vehicle.model" type="text" size="full" disabled />
        </div>

        <div class="vehicle-details-form-row">
          <label>Year</label>
          <BInput v-model="vehicle.year" type="text" size="full" disabled />
        </div>

        <div class="vehicle-details-form-row">
          <label>In Stock</label>
          <BSelect
            v-model="vehicle.in_stock"
            :items="stockSelectOptions"
            size="full"
          />
        </div>

        <div class="vehicle-details-form-row">
          <label>HP</label>
          <BInput
            v-model="vehicle.horse_power"
            type="number"
            size="full"
            :min="100"
            :max="550"
          />
        </div>

        <div class="vehicle-details-form-row">
          <label>Price</label>
          <BInput v-model="vehicle.price" type="text" size="full" />
        </div>

        <div class="vehicle-details-form-row color-row">
          <label>Color</label>
          <BRadio
            :value="vehicle.color"
            :options="colorOptions"
            groupName="vehicle-color"
            :hasPreview="true"
            @update="handleColorUpdate"
          />
        </div>

        <div class="vehicle-details-form-row action-buttons">
          <BButton class="tertiary" @click="navigateToVehicleListing">
            Cancel
          </BButton>

          <BButton :disabled="isVehicleFormDirty" @click="updateVehicleData">
            Save
          </BButton>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
import BInput from "./base/BInput.vue";
import BSelect from "./base/BSelect.vue";
import BRadio from "./base/BRadio.vue";
import BButton from "./base/BButton.vue";
import { supabase } from "../utils/supabase";
import { isEqual, cloneDeep } from "lodash";
import BLoader from "./base/BLoader.vue";

export default {
  name: "VehicleDetails",

  components: {
    BInput,
    BSelect,
    BRadio,
    BButton,
    BLoader,
  },

  props: {
    vehicleId: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      isLoading: false,
      vehicle: {},
      lastSavedVehicleData: {},
      colors: [],
      stockSelectOptions: [
        {
          label: "In Stock",
          value: true,
        },
        {
          label: "Out of Stock",
          value: false,
        },
      ],
    };
  },

  created() {
    this.getVehicleDetails();
    this.getSelectableVehicleColors();
  },

  methods: {
    getVehicleDetails() {
      this.isLoading = true;
      supabase
        .from("vehicle")
        .select("*")
        .eq("id", this.vehicleId)
        .single()
        .then(({ data }) => {
          this.vehicle = cloneDeep(data);
          this.lastSavedVehicleData = cloneDeep(data);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    getSelectableVehicleColors() {
      this.isLoading = true;

      supabase
        .from("colors")
        .select("*")
        .then(({ data }) => {
          this.colors = data;
        });
    },

    handleColorUpdate(value) {
      this.vehicle.color = value;
    },

    updateVehicleData() {
      this.isLoading = true;

      supabase
        .from("vehicle")
        .update({ ...this.vehicle })
        .eq("id", this.vehicleId)
        .select()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.navigateToVehicleListing();
        });
    },

    navigateToVehicleListing() {
      this.$router.push({ name: "VehicleListing" });
    },
  },

  computed: {
    isVehicleFormDirty() {
      return isEqual(this.vehicle, this.lastSavedVehicleData);
    },

    colorOptions() {
      return this.colors.map(({ id, color }) => ({
        id,
        value: color,
        label: color,
        disabled: false,
      }));
    },
  },
};
</script>

<style lang="scss">
.vehicle-details {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 2, 38, 0.12);
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  max-width: 700px;
  margin: 0 auto;

  &-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 14px;
  }

  &-form {
    max-width: 540px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px 20px;

    label {
      font-weight: bold;
      margin-left: 2px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-row {
      display: flex;
      flex-direction: column;

      &.color-row {
        grid-area: 5 / 1 / 6 / 3;

        #vehicle-color {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
      }

      &.action-buttons {
        grid-area: 6 / 1 / 7 / 3;
        flex-direction: row;
        justify-content: center;
        margin-top: 14px;
        gap: 10px;
      }
    }
  }
}
</style>
