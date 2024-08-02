<template>
  <div>
    <!-- 顶部 -->
    <fieldset class="title">
      <legend>修改管理员</legend>
    </fieldset>
    <!-- 表单 -->
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" class="input" placeholder="管理员账号" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" class="input"
          placeholder="密码留空则不修改，密码需包含数字、字母、符号，且长度为6 - 20位"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" class="input"
          placeholder="密码留空则不修改，密码需包含数字、字母、符号，且长度为6 - 20位"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="ruleForm.mobile" class="input" placeholder="管理员手机号码"></el-input>
        <span class="password-tip">注：手机号码是重要信息，需要用来接收短信验证码，请正确填写！</span>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" class="input" placeholder="管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="roleIdList">
        <el-checkbox-group v-model="ruleForm.roleIdList" :max="1" class="role">
          <el-checkbox :label="item.roleName" v-for="item in roleList" :key="item.roleId"
            v-if="item.roleName == '学校管理员' || item.roleName == '校区管理员'">
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="管理区域" prop="schoolDtoList">
        <div class="manage-region" v-for="item in manageRegionList" :key="item.id">
          <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.all" @change="handleAllChange(item)"
            class="manage-region-checkbox" :disabled="enableRegion">{{ item.name }}</el-checkbox>
          <el-checkbox-group v-model="item.campusIdList" @change="handleCheckedChange(item)">
            <el-checkbox class="manage-region-checkbox-branch" v-for="campus in item.schoolCampusList" :key="campus.id"
              :label="campus.id" :disabled="isBranch">{{ campus.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status" active-color="#13ce66" active-text="正常" inactive-text="禁用"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="submitForm('ruleForm')">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写管理员账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if ((value.length < 6 && value.length > 0) || value.length > 20) {
        callback(new Error('请输入6-20位的密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    var validateEmail = (rule, value, callback) => {
      let re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)
      if (!re && value) {
        callback(new Error('邮箱格式不正确！'));
      } else {
        callback();
      }
    }
    var validateMobile = (rule, value, callback) => {
      let re = /^1[0-9]{10}$/.test(value)
      if (!re && value) {
        callback(new Error('手机号码格式不正确！'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        mobile: '',
        email: '',
        status: 0,
        roleIdList: [],
        schoolDtoList: [],
        roleType: null,//登录人角色
      },
      roleList: [],
      manageRegionList: [],
      rules: {
        username: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        roleIdList: [
          { type: 'array', required: true, message: '请至少选择一个所属角色', trigger: 'change' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      //管理区域学校选项是否禁用
      enableRegion: true,
      //管理区域校区选项是否禁用
      isBranch: true
    }
  },

  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid, invalidFields) => {
        if (valid) {
          let msg = ''
          try {
            // 整理 ruleForm
            this.ruleForm.schoolDtoList = []
            await this.manageRegionList.forEach((item) => {
              if (item.all || item.isIndeterminate) {
                console.log(item);
                let schoolDto = {}
                if (this.ruleForm.roleIdList[0] === '校区管理员') {
                  let schoolCampusDto = []
                  item.campusIdList.forEach((val) => {
                    schoolCampusDto.push({ id: val })
                  })
                  schoolDto = { id: item.id, schoolCampusDto: schoolCampusDto }
                }
                if (this.ruleForm.roleIdList[0] === '学校管理员') {
                  schoolDto = { id: item.id }
                }
                this.ruleForm.schoolDtoList.push(schoolDto)
              }
            })
            this.ruleForm.status = this.ruleForm.status ? 1 : 0
            this.ruleForm.userId = +this.$route.query.userId
            await this.roleList.forEach(item => {
              if (item.roleName === this.ruleForm.roleIdList[0]) {
                this.ruleForm.roleIdList[0] = item.roleId
              }
            })
            // 删除再次输入密码的变量
            delete this.ruleForm.checkPass
            // 删除表单中的无效值
            for (let key in this.ruleForm) {
              if (this.ruleForm[key] === undefined || this.ruleForm[key] === null) {
                delete this.ruleForm[key];
              }
            }
            // 使用 await 等待 HTTP 请求完成
            const response = await this.$http({
              url: this.$http.adornUrl('admin/school/updateAdminSchool'),
              method: 'post',
              data: this.ruleForm
            });
            console.log('response', response);
            if (response.data.code === 500) {
              msg = response.data.msg;
              throw new Error(msg)
            }
            // 处理响应数据
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1500,
            });
            this.reset()
            this.$router.push('/schoolAdmin')
          } catch (error) {
            // 处理可能发生的错误
            console.error('请求数据失败:', msg);
            // 错误通知
            this.$message.error(`${msg || error}`);
            this.$router.push('/schoolAdmin')
          }
        } else {
          // 从 invalidFields 中获取错误信息
          let errorMessage = '';
          Object.keys(invalidFields).forEach(key => {
            invalidFields[key].forEach(field => {
              errorMessage += (field.message || field) + '!\n';
            });
            console.log('invalidFields[key]', invalidFields[key]);
          });
          // 显示错误信息
          this.$message.error(errorMessage.trim());
          return false;
        }
      })
    },

    //获取管理员数据
    async getAdminSchool(userId) {
      try {
        // 使用 await 等待 HTTP 请求完成
        const response = await this.$http({
          url: this.$http.adornUrl('admin/school/queryDesignateAdminSchool'),
          method: 'get',
          params: { userId }
        });
        // 处理响应数据
        let res = response.data.data;
        // 处理所属角色列表
        let tempRoleIdList = []
        res.sysUserRoleEntity.forEach(item => {
          if (item.roleName == '学校管理员' || item.roleName == '校区管理员') tempRoleIdList.push(item.roleName)
        })
        // 处理学校校区数据
        let schoolVoList = []
        schoolVoList = res.schoolVoList.map(item => {
          let schoolCampusDto = []
          item.schoolCampusVoList.forEach(element => schoolCampusDto.push({ id: element.id }))
          return { id: item.id, schoolCampusDto: schoolCampusDto }
        })
        //处理管理区域列表
        this.manageRegionList.forEach(item => {
          // 首先确保item.campusIdList是一个数组
          if (!Array.isArray(item.campusIdList)) {
            item.campusIdList = [];
          }
          const matchingSchoolVo = schoolVoList.find(element => element.id === item.id);
          if (matchingSchoolVo) {
            item.all = true;
            if (matchingSchoolVo.schoolCampusDto) {
              matchingSchoolVo.schoolCampusDto.forEach(campus => {
                item.campusIdList.push(campus.id);
              });
            }
          }
        });
        //渲染表单
        this.ruleForm = {
          username: res.username,
          password: '',
          checkPass: '',
          mobile: res.mobile,
          email: res.email,
          status: res.status ? true : false,
          roleIdList: tempRoleIdList,
          schoolDtoList: schoolVoList,
        }
      } catch (error) {
        // 处理可能发生的错误
        console.error('请求数据失败:', error);
        // 错误通知
        this.$message.error('加载数据失败，请检查网络或稍后重试');
      }
    },

    //获取角色列表
    async getRoleList() {
      try {
        // 使用 await 等待 HTTP 请求完成
        const response = await this.$http({
          url: this.$http.adornUrl('sys/role/selectRoleSchoolAndCampus'),
          method: 'get'
        });
        // 处理响应数据
        let res = response.data.data;
        this.roleList = res
      } catch (error) {
        // 处理可能发生的错误
        console.error('请求数据失败:', error);
        // 错误通知
        this.$message.error('加载数据失败，请检查网络或稍后重试');
      }
    },

    //获取所有学校和校区列表
    async getSchoolList() {
      try {
        // 使用 await 等待 HTTP 请求完成
        const response = await this.$http({
          url: this.$http.adornUrl('admin/school/querySchoolAndSchoolCampus'),
          method: 'get'
        });
        // 处理响应数据
        let res = response.data.data;
        res.forEach(element => {
          element.all = false
          element.isIndeterminate = false
          element.campusIdList = []
        })
        this.manageRegionList = res
      } catch (error) {
        // 处理可能发生的错误
        console.error('请求数据失败:', error);
        // 错误通知
        this.$message.error('加载数据失败，请检查网络或稍后重试');
      }
    },

    //更新管理区域校区是否禁用
    updateIsBranchStatus(boolean) {
      this.isBranch = boolean
    },
    //更新管理区域学校是否禁用
    updateEnableRegionStatus(boolean) {
      this.enableRegion = boolean
    },

    //管理区域全选处理
    handleAllChange(item) {
      item.campusIdList = item.all ? item.schoolCampusList.map(campus => campus.id) : [];
      item.isIndeterminate = false;
    },

    //管理区域校区选择处理
    handleCheckedChange(item) {
      let count = item.campusIdList.length
      item.all = item.schoolCampusList.length === count;
      item.isIndeterminate = count > 0 && count < item.schoolCampusList.length;
    },

    //重置表单
    reset() {
      this.ruleForm = {
        username: '',
        password: '',
        checkPass: '',
        mobile: '',
        email: '',
        status: 0,
        roleIdList: [],
        schoolDtoList: [],
      },
        this.manageRegionList.forEach(element => {
          element.all = false
          element.isIndeterminate = false
          element.campusIdList = []
        })
    }
  },
  //监视所属角色值的变化
  watch: {
    'ruleForm.roleIdList': {
      handler(newVal, oldVal) {
        let isBranch = true
        let enableRegion = true
        // 当 ruleForm.roles 变化时执行的函数
        if (newVal == '校区管理员') {
          isBranch = false
          enableRegion = false
        }
        if (newVal == '学校管理员') {
          enableRegion = false
          this.manageRegionList.forEach((element, index) => {
            console.log(index, element);
            if (element.isIndeterminate == true || element.all == true) {
              element.campusIdList = element.schoolCampusList.map(campus => campus.id)
              element.all = true
              element.isIndeterminate = false;
            }
          })
        }
        this.updateIsBranchStatus(isBranch);
        this.updateEnableRegionStatus(enableRegion)
      },
      deep: true // 深度监听
    }
  },

  mounted() {
    this.getRoleList();
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      vm.reset();
      await vm.getSchoolList();
      vm.getAdminSchool(vm.$route.query.userId)
    });
  },

  async beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    this.reset();
    await this.getSchoolList();
    this.getAdminSchool(this.$route.query.userId)
    next();
  }
}
</script>

<style scoped="scoped">
/* 标题 */
.title {
  border-width: 1px 0 0;
  border-color: '#e6e6e6';
}

legend {
  font-size: 20px;
  padding: 0 10px;
}

/* 表单输入框 */
.input {
  width: 560px;
}

/* 表单必填提示 */
.must {
  display: inline;
  color: #999 !important;

  &::before {
    content: '*';
    padding-right: 5px;
  }
}

/* 表单状态属性的按钮 */
.switch-on,
.switch-off {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  overflow: hidden;
}

.switch-on {
  left: 5px;
}

.switch-off {
  right: 5px;
}

.password-tip {
  display: block;
  color: #999;
}

/* 所属角色选项组 */
.role {
  margin-right: 10px;
}

/* 所属角色选项 */
.el-radio+.el-radio {
  margin-left: 20px;
}

/* 所属角色选项 */
.el-radio {
  margin-left: 20px;
}

/* 管理区域边框 */
.manage-region {
  border: 1px solid #ddd;
}

/* 管理区域学校选项 */
.manage-region-checkbox {
  width: 98%;
  margin: 0 1%;
  border-bottom: 1px solid #ddd;
  font-weight: 800;
}

/* 管理区域校区选项 */
.manage-region-checkbox-branch {
  width: 98%;
  margin: 0 1%;
  padding: 0 1%;
  /* border-bottom: 1px solid #ddd; */
}

.el-form-item {
  margin-bottom: 25px;
}
</style>
