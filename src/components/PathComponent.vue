<template>
  <div class="parent mb-5 px-3">
    <b-breadcrumb class="website-path">
      <b-breadcrumb-item to="/">
        <i class="bi bi-house px-1"></i>Página principal
      </b-breadcrumb-item>
      <b-breadcrumb-item
        v-for="(path, index) in filteredPathList"
        :key="index"
        :to="path[1]"
      >
        {{ path[0] }}
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        {{ pathList[pathList.length - 1][0] }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>

<style>
.website-path a,
.website-path i {
  color: #5a5a5a !important;
}

.website-path a:hover {
  color: #f1b24a !important;
}

.website-path .active span {
  color: #5a5a5a !important;
}
</style>

<script lang="ts">
export default {
  props: {
    pathList: {
      type: Array as () => string[][],
      required: true,
    },
  },
  computed: {
    filteredPathList() {
      return this.pathList.slice(0, -1);
    },
  },
};
</script>
