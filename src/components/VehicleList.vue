<template>
  <div class="vehicle-list">
    <template v-if="isLoading">
      <BLoader />
    </template>

    <template v-else>
      <div class="vehicle-list-table">
        <div class="vehicle-list-table-header">
          <div
            v-for="(header, headerIndex) in tableHeaders"
            :key="headerIndex"
            class="vehicle-list-table-header-cell"
          >
            {{ header.text }}
          </div>
        </div>

        <div class="vehicle-list-table-body">
          <div
            v-for="(vehicle, vehicleIndex) in vehicleList"
            :key="vehicleIndex"
            class="vehicle-list-table-body-row"
          >
            <div
              v-for="(header, headerCellIndex) in tableHeaders"
              :key="headerCellIndex"
              class="vehicle-list-table-body-cell"
            >
              <template v-if="header.cellFormatter">
                {{ header.cellFormatter(vehicle[header.key]) }}
              </template>

              <template v-else-if="header.type === 'color'">
                {{ vehicle[header.key] }}
                <div
                  class="color-preview"
                  :style="`background-color: ${vehicle[header.key]}`"
                ></div>
              </template>

              <template v-else-if="header.type === 'button'">
                <BButton @click="routeToVehicleDetails(vehicle.id)">
                  Edit
                </BButton>
              </template>

              <template v-else>
                {{ vehicle[header.key] || "-" }}
              </template>
            </div>
          </div>
        </div>

        <div class="vehicle-list-table-footer">
          <BPagination
            v-bind="paginationProps"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { supabase } from "../utils/supabase";
import BButton from "./base/BButton.vue";
import BLoader from "./base/BLoader.vue";
import BPagination from "./base/BPagination.vue";

export default {
  name: "VehicleList",

  components: {
    BButton,
    BPagination,
    BLoader,
  },

  data() {
    return {
      isLoading: false,
      vehicleList: [],
      pageSize: 10,
      currentPage: 1,
      tableHeaders: [
        {
          key: "id",
          text: "ID",
        },
        {
          key: "make",
          text: "Make",
        },
        {
          key: "model",
          text: "Model",
        },
        {
          key: "year",
          text: "Year",
        },
        {
          key: "in_stock",
          text: "In Stock",
          cellFormatter: (cell) => {
            return cell ? "Yes" : "No";
          },
        },
        {
          key: "horse_power",
          text: "HP",
        },
        {
          key: "price",
          text: "Price",
          cellFormatter: (cell) => {
            return `${this.formatPriceWithDots(cell)} €`;
          },
        },
        {
          key: "color",
          text: "Color",
          type: "color",
        },
        {
          key: "actions",
          text: "",
          type: "button",
        },
      ],
    };
  },

  computed: {
    paginationProps() {
      return {
        totalCount: 100,
        itemPerPage: this.pageSize,
        activePageNumber: this.currentPage,
        maxViewCount: 2,
      };
    },
  },

  created() {
    this.getVehicles();
  },

  methods: {
    getVehicles() {
      this.isLoading = true;

      supabase
        .from("vehicle")
        .select("*")
        .range(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize - 1
        )
        .then(({ data }) => {
          this.vehicleList = data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    routeToVehicleDetails(id) {
      this.$router.push({ name: "VehicleDetails", params: { id } });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getVehicles();
    },

    formatPriceWithDots(price) {
      const [integerPart, decimalPart] = String(price).split(".");

      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );

      const formattedPrice = decimalPart
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;

      return formattedPrice;
    },
  },
};
</script>

<style lang="scss">
.vehicle-list {
  padding: 20px;

  &-table {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 2, 38, 0.12);
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;

    &-header {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      background-color: #f8fafb;
      border-bottom: 1px solid #dfdfdf;

      &-cell {
        font-weight: 700;
        text-transform: uppercase;
        padding: 8px;
      }
    }

    &-body {
      &-row {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        transition: all 0.05s linear;

        &:hover {
          background-color: #f8fafb;
        }
      }

      &-cell {
        display: flex;
        align-items: center;
        padding: 8px;
        gap: 6px;

        .color-preview {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }
}

@media (max-height: 700px) {
  .vehicle-list-table-body {
    max-width: 700px;
    overflow-y: auto;
  }
}
</style>
