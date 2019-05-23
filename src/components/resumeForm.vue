<template>
  <div class="job-list">
    <el-form :model="resumeForm" ref="resumeForm" label-width="110px" label-position="left">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for='item in list' :key='item.value' :name="item.value">
          <template slot="title">
            <div :id="item.value" class="link-item" style="position: relative;top: -130px;"></div>
            <span class="title">{{item.label}}</span>
            <span class="tips">{{activeNames|status(item.value)}}</span>
          </template>
          <div class="content">
            <el-form-item v-for="li in item.list" :key="li.value" :label="`${li.label}:`" :prop="item.value" :rules="li.type|rules(li.label,li.value)">
              <el-input size="mini" v-if="li.type==='input'||li.type==='numInput'||li.type==='phoneInput'" :placeholder="li.placeholder||`请输入${li.label}`" v-model="resumeForm[item.value][li.value]"></el-input>
              <el-input
                 v-else-if="li.type==='textarea'"
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="li.placeholder||`请填写您的${li.label}`"
                v-model="resumeForm[item.value][li.value]">
              </el-input>
              <el-radio-group v-else-if="li.type==='radio'" v-model="resumeForm[item.value][li.value]">
                <el-radio v-for="option in li.list" :key="option.value" :label="option.value">{{option.label}}</el-radio>
              </el-radio-group>
              <el-select style="width:100%" size="mini" v-else-if="li.type==='select'||li.type==='multipleSelect'" :multiple="li.type==='multipleSelect'" v-model="resumeForm[item.value][li.value]">
                <el-option v-for="option in li.list" :key="option.value" :label="option.label" :value="option.value"></el-option>
              </el-select>
              <el-date-picker
                v-else-if="li.type==='monthSelect'"
                v-model="resumeForm[item.value][li.value]"
                type="month"
                size="mini"
                value-format='yyyy-MM'
                style="width:100%"
                :placeholder="li.placeholder||`请选择${li.label}`">
              </el-date-picker>
              <el-date-picker
                v-else-if="li.type==='monthRange'"
                v-model="resumeForm[item.value][li.value]"
                type="monthrange"
                size="mini"
                :clearable="false"
                range-separator="至"
                value-format='yyyy-MM'
                style="width:100%"
                start-placeholder="开始月份"
                end-placeholder="结束月份">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-form-item label="手机号" style="margin-top:20px">
        <div class="mobileInput">
          <el-input size='mini' v-model="mobileNum" placeholder="请输入手机号"></el-input> <el-button type="primary" size='mini' :disabled="sendDisable">发送验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item label="验证码" prop="vldCode" :rules="vldCodeRules">
        <div class="vldCodeInput">
          <el-input size='mini' v-model="resumeForm.vldCode" placeholder=""></el-input>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div class="submit-bar">
          <el-button size='mini' type="primary" @click="submit" :loading="submitLoading">保存</el-button>
          <el-checkbox v-model="isAgree">阅读并已同意</el-checkbox>
          <span @click="openDialog">《用户隐私协议》</span>
        </div>
      </el-form-item>
      <div>
      </div>
    </el-form>
    <el-dialog title="用户隐私协议" :visible.sync="dialogVisible" width="70%">
      <div class="dialog-content" v-html='dialogContent' v-loading="dialogLoading">

      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      activeNames: [],
      mobileNum: '',
      vldCode: '',
      isAgree: false,
      dialogVisible: false,
      dialogContent: '',
      dialogLoading: false,
      submitLoading: false
    }
  },
  filters: {
    rules (type, label, value) {
      let requiredMsg, requiredArr
      if (type === 'monthRange' || type === 'monthSelect' || type === 'select' || type === 'multipleSelect') {
        requiredMsg = `请选择${label}`
      } else {
        requiredMsg = `请输入${label}`
      }
      if (type === 'numInput') {
        requiredArr = [
          { required: true, message: requiredMsg, trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value) {
              if (Number(value) >= 0 && parseInt(value) >= 0) {
                callback()
              } else {
                callback(new Error('请输入大于零的数字 ...'))
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
          }
        ]
      } else if (type === 'phoneInput') {
        requiredArr = [
          { required: true, message: requiredMsg, trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value) {
              if (Number(value) && parseInt(value) > 9999999999 && parseInt(value) <= 19999999999) {
                callback()
              } else {
                callback(new Error('手机号格式不正确 ...'))
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
          }
        ]
      } else if (type === 'monthRange' || type === 'multipleSelect') {
        requiredArr = [{ type: 'array', required: true, message: requiredMsg, trigger: 'blur' }]
      } else {
        requiredArr = [{ required: true, message: requiredMsg, trigger: 'blur' }]
      }
      return {
        type: 'object',
        required: true,
        trigger: 'blur',
        fields: {
          [value]: requiredArr
        }
      }
    },
    status (activeNames, value) {
      return activeNames.includes(value) ? '展开' : '收起'
    }
  },
  props: {
    list: Array,
    resumeForm: Object
  },
  computed: {
    sendDisable () {
      return window.isNaN(-this.mobileNum) || this.mobileNum <= 9999999999 || this.mobileNum > 19999999999
    },
    vldCodeRules () {
      return [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          if (value) {
            api.getVldCode(
              {
                mobile: this.mobileNum,
                vldCode: this.vldCode
              }
            ).then(res => {
              if (res.data) {
                callback()
              } else {
                callback(new Error('验证码错误...'))
              }
            })
          } else {
            callback()
          }
        },
        trigger: 'blur'
        }
      ]
    }
  },
  created () {
    this.activeNames = this.list.map(item => item.value)
  },
  methods: {
    submit () {
      this.$refs.resumeForm.validate((valid) => {
        if (valid) {
          if (this.isAgree) {
            this.submitLoading = true
            api.submitResumeForm(this.resumeForm).then(res => {
              this.submitLoading = false
              if (res.data) {
                this.$message({
                  message: '投递成功！',
                  type: 'success'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    openDialog () {
      this.dialogLoading = true
      this.dialogVisible = true
      api.getAgreement().then(res => {
        this.dialogContent = res.data
        this.dialogLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .job-list{
    padding: 40px 0;
    .dialog-content{
      min-height: 300px;
    }
    .el-dialog__wrapper::v-deep{
      .el-dialog{
        background: white;
        .el-dialog__body{
          padding: 0 20px;
          max-height: 500px;
          overflow: auto;
        }
      }
    }
    .el-collapse-item::v-deep{
      .el-collapse-item__header{
        padding-left: 30px;
        position: relative;
        background:rgba(246,246,246,1);
        height: 40px;
        .title{
          color: #69C72B;
          line-height: 40px;
          font-size: 16px;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #69C72B;
            left: -10px;
            top: 18px;
          }

        }
        .tips{
          position: absolute;
          right:35px;
          top: 0;
          color: #69C72B;
          line-height: 40px;
        }
      }
    }
    .content{
      padding-top: 30px;
      padding-right: 30%;
      @media screen and (max-width: 769px) {
        padding-top: 10px;
        padding-right: 0px;
      }
    }
    .mobileInput,.vldCodeInput{
      .el-input{
        width: 150px;
        margin-right: 15px;
        @media screen and (max-width: 465px) {
          width: 100%;
          margin-right: 0;
          margin-bottom: 15px;
       }
      }
    }
    .submit-bar{
      .el-button{
        margin-right: 30px;
      }
      .el-checkbox{
        margin-right:0px;
      }
      >span{
        color: #69C72B;
        cursor: pointer;
      }
    }
  }
</style>
