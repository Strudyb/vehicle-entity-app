<template>
  <div v-show="totalPageCount > 1" class="pagination">
    <ul class="pagination-list">
      <BButton
        v-show="activePageNumber !== 1"
        type="button"
        class="secondary"
        @click="changePage(Math.max(activePageNumber - 1, 1))"
      >
        &#8592;
      </BButton>

      <li class="pagination-item">
        <BButton
          type="button"
          class="secondary numbers-btn"
          :class="{ active: 1 === activePageNumber }"
          @click="changePage(1)"
        >
          1
        </BButton>
      </li>

      <li v-show="viewStartNumber !== 2">...</li>

      <li v-for="pageNumber in pages" :key="pageNumber" class="pagination-item">
        <BButton
          type="button"
          class="secondary numbers-btn"
          :class="{ active: pageNumber === activePageNumber }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </BButton>
      </li>

      <li v-show="viewEndNumber !== totalPageCount - 1">...</li>

      <li class="pagination-item">
        <BButton
          type="button"
          class="secondary numbers-btn"
          :class="{ active: totalPageCount === activePageNumber }"
          @click="changePage(totalPageCount)"
        >
          {{ totalPageCount }}
        </BButton>
      </li>

      <BButton
        v-show="activePageNumber !== totalPageCount"
        type="button"
        class="secondary"
        @click="changePage(Math.min(activePageNumber + 1, totalPageCount))"
      >
        &#8594;
      </BButton>
    </ul>
  </div>
</template>

<script>
import BButton from "./BButton.vue";

export default {
  name: "BPagination",

  components: {
    BButton,
  },

  props: {
    totalCount: {
      type: [Number, String],
      default: 0,
    },
    itemPerPage: {
      type: [Number, String],
      default: 0,
    },
    activePageNumber: {
      type: [Number, String],
      default: 0,
    },
    maxViewCount: {
      type: [Number, String],
      default: 5,
    },
  },

  computed: {
    totalPageCount() {
      return this.itemPerPage
        ? Math.ceil(this.totalCount / this.itemPerPage)
        : this.totalCount;
    },

    pages() {
      return this.range(this.viewStartNumber, this.viewEndNumber);
    },

    viewStartNumber() {
      return Math.max(
        this.activePageNumber - Math.round(this.maxViewCount / 2),
        2
      );
    },

    viewEndNumber() {
      return Math.min(
        this.activePageNumber + Math.round(this.maxViewCount / 2),
        this.totalPageCount - 1
      );
    },
  },

  methods: {
    changePage(pageNumber) {
      this.$emit("pageChange", pageNumber);
    },

    range(start, end) {
      return Array(Math.max(0, end - start + 1))
        .fill()
        .map((_, index) => start + index);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  .pagination-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    .pagination-item {
      padding: 0 (10 * 0.25);
      .numbers-btn {
        text-align: center;
        font-size: 12px;

        &::after {
          border-radius: 50% !important;
        }

        &.active {
          border: 1px solid #dde6eb;
        }
      }
    }
  }
}
</style>
