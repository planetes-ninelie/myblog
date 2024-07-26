<template>
  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<template>
  <div class="manage-region" v-for="item in manageRegionList" :key="item.id">
    <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.all" @change="handleAllChange(item)"
      class="manage-region-checkbox" :disabled="enableRegion">{{ item.name }}</el-checkbox>
    <el-checkbox-group v-model="item.campusIdList" @change="handleCheckedChange(item)">
      <el-checkbox class="manage-region-checkbox-branch" v-for="campus in item.schoolCampusList" :key="campus.id"
        :disabled="isBranch">{{
          campus.name }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default() {
  methods: {
    handleAllChange(item) {
      item.campusIdList = item.all ? item.schoolCampusList.map(campus => campus.id) : [];
      item.isIndeterminate = false;
      console.log(this.manageRegionList);
    },
  
    handleCheckedChange(item) {
      let count = item.campusIdList.length
      item.all = item.schoolCampusList.length === count;
      item.isIndeterminate = count > 0 && count < item.schoolCampusList.length; console.log(this.manageRegionList);
    }
  }
}
</script>