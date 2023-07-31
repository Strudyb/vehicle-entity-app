<template>
  <div class="home">
    <VehicleList />
  </div>
</template>

<script>
// @ is an alias to /src
import VehicleList from '@/components/VehicleList.vue'

export default {
  name: 'HomeView',
  components: {
    VehicleList
  }
}
</script>
