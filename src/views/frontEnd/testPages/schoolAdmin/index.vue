<template>
  <div>
    <!-- 顶部添加按钮 -->
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('/schoolAdd')">添加管理员</el-button>
    <!-- 搜素框 -->
    <div style="display: flex;justify-content: start;margin-top: 10px;">
      <el-input v-model="userNameForm" placeholder="账号" class="input"></el-input>
      <el-input v-model="phoneForm" placeholder="手机号码" class="input"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="schoolAdminSelect()">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData.records" height="calc(100vh - 300px)" class="table" border
      :header-cell-style="{ background: '#e6e6e6' }">
      <el-table-column fixed="left" prop="userId" label="ID" width="100"></el-table-column>
      <el-table-column label="账号" prop="userName" width="150"></el-table-column>
      <el-table-column label="所属角色" prop="roleName" width="150"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="190"></el-table-column>
      <el-table-column label="手机号" prop="mobile" width="150"></el-table-column>
      <el-table-column label="所属区域" prop="region" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="190"></el-table-column>
      <el-table-column fixed="right" label="状态" prop="status" width="100">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? '正常' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push(`/schoolAmend?userId=${scope.row.userId}`)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="schoolDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align: center;margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[15, 30, 50, 75, 100]" :page-size="pageSize" :current-page="currPage"
        layout="total,sizes, prev, pager, next,jumper" :total="tableData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分页组件属性
      pageSize: 15,
      currPage: 1,
      //搜索输入框属性
      userNameForm: '',
      phoneForm: '',
      //表格数据
      tableData: []
    }
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.schoolAdminSelect()
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.schoolAdminSelect()
    },
    //搜索
    select() {
      this.schoolAdminSelect()
    },

    // 删除学校管理员数据
    async schoolDelete(row) {
      try {
        // 弹出确认对话框
        await this.$confirm(`确定删除${row.account || ''}?`, '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        // 发送 HTTP 请求
        const response = await this.$http({
          url: this.$http.adornUrl('admin/school/deleteAdminSchool'),
          method: 'delete',
          params: this.$http.adornParams({
            'userId': row.userId
          })
        });
        if (response.data.code === 500) {
          throw new Error(response.data.msg)
        }
        // 处理成功的响应
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500,
        });
        this.schoolAdminSelect();
      } catch (error) {
        if (error.name === 'DialogCancelledError') {
          return;
        }
        console.error('删除操作失败:', error.message || 'error');
        this.$message.error('删除操作失败:', error.message || 'error');
      }
    },

    // 获取学校管理员数据
    async schoolAdminSelect() {
      try {
        this.tableDataLoading = true;
        // 使用 await 等待 HTTP 请求完成
        const response = await this.$http({
          url: this.$http.adornUrl('admin/school/pageAdminSchool'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.currPage,
            'limit': this.pageSize,
            'userName': this.userNameForm,
            'phone': this.phoneForm,
          })
        });
        if (response.data.code == 500) {
          throw new Error(response.data.msg)
        } else {
          // 处理响应数据
          let res = response.data;
          // 修改 region 属性
          res.data.records.forEach(element => {
            if (Array.isArray(element.region)) {
              element.region = element.region.join(' | ');
            }
          });
          // 更新 tableData
          this.tableData = res.data;
          this.tableDataLoading = false;
        }
      } catch (error) {
        // 处理可能发生的错误
        console.error('请求数据失败:', error.message);
        this.tableDataLoading = false;
        // 错误通知
        this.$message.error(error.message || '加载数据失败，请检查网络或稍后重试');
      }
    },
  },
  mounted() {
    this.schoolAdminSelect()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.schoolAdminSelect();
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    this.schoolAdminSelect();
    next();
  }
};
</script>

<style scoped="scoped">
/* 顶部输入框样式 */
.input {
  width: 150px;
  margin-right: 20px;
}

/* 表格样式操作按钮样式 */
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px;
}

/* 表头文字居中 */
.el-table .cell,
.el-table th div {
  text-align: center !important;
}

/* 表格样式 */
.table {
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 2em;
  margin-top: 20px;
  min-height: 140px;
}

/* 表格每行样式 */
.el-table--medium td,
.el-table--medium th {
  padding: 5px 0;
}

/* 表格所属区域换行 */
.el-table_1_column_6 .cell {
  white-space: pre;
}
</style>
