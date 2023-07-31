<template>
  <div class="vehicle-details-view">
    <VehicleDetails :vehicleId="vehicleId"/>
  </div>
</template>

<script>
import VehicleDetails from '../components/VehicleDetails.vue';

export default {
  name: "VehicleDetailsView",

  components: {
    VehicleDetails
  },

  data() {
    return {};
  },

  computed: {
    vehicleId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss">
.vehicle-details-view {
  padding: 20px;
}
</style>
