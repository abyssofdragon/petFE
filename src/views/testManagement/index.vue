<template>
  <div style="margin: 20px">
    <div class="title">
      题库管理
    </div>

    <div style="margin: 20px">
      <div>
        <el-button type="success" @click="addDialog = true">增加试题</el-button>
        <span style="float: right">
          <el-input
            v-model="categorySearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button @click="searchPrbByCtg">筛选病种</el-button>
        </span>
        <span style="float: right">
          <el-input
            v-model="problemSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button @click="searchPrbByCtn">搜索题目</el-button>
        </span>
      </div>

      <el-table
        :data="problemList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :current-page.sync="currentPage"
        style="width: 100%"
      >
        <el-table-column
          prop="questionId"
          label="编号"
          width="180"
        />
        <el-table-column
          prop="category"
          label="病种"
          width="180"
          :filters="categoryFilter"
          :filter-method="filterType"
        />

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="选项A">
                <span>{{ props.row.optionA }}</span>
              </el-form-item>
              <el-form-item label="选项B">
                <span>{{ props.row.optionB }}</span>
              </el-form-item>
              <el-form-item label="选项C">
                <span>{{ props.row.optionC }}</span>
              </el-form-item>
              <el-form-item label="选项D">
                <span>{{ props.row.optionD }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          prop="content"
          label="题目"
          width="180"
        />
        <el-table-column
          prop="answer"
          label="答案"
          width="180"
        />
        <el-table-column
          prop="score"
          label="分值"
          width="180"
        />
        <el-table-column
          lable="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="modifyD(scope.row.questionId)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteD(scope.row.questionId)" />
          </template>

        </el-table-column>
      </el-table>

      <el-pagination
        :page-sizes="[5,10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      title="修改试题"
      :visible.sync="modifyDialog"
      width="30%"
    >
      <el-form ref="form" :model="problem" label-width="80px">
        <el-form-item label="病种">
          <el-input v-model="problem.category" />
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="problem.content" />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="problem.optionA" />
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="problem.optionB" />
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="problem.optionC" />
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="problem.optionD" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="problem.answer" />
        </el-form-item>
        <!--        <el-form-item label="分值">-->
        <!--          <el-input v-model="problem.score"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="modifyProblem">立即修改</el-button>
          <el-button @click="modifyDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="增加试题"
      :visible.sync="addDialog"
      width="30%"
    >
      <el-form ref="form" :model="problem" label-width="80px">
        <el-form-item label="病种">
          <el-input v-model="problem.category" />
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="problem.content" />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="problem.optionA" />
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="problem.optionB" />
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="problem.optionC" />
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="problem.optionD" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="problem.answer" />
        </el-form-item>
        <!--        <el-form-item label="分值">-->
        <!--          <el-input v-model="problem.score"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="addProblem">立即增加</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="警告"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>是否确认删除试题?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="deleteProblem">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      problemList: [{ questionId: 0, category: '口炎', content: '这是第一个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'A', score: 2 },
        { questionId: 1, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 2, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 3, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 4, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 5, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 6, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 7, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 8, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 },
        { questionId: 9, category: '肠炎', content: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 }
      ],
      categoryFilter: [{ text: '犬瘟热', value: '犬瘟热' }, { text: '猫感冒', value: '猫感冒' }, { text: '鹦鹉热', value: '鹦鹉热' },
        { text: '猫病毒性鼻气管炎', value: '猫病毒性鼻气管炎' }, { text: '猫泛白细胞减少症', value: '猫泛白细胞减少症' }],
      currentPage: 1,
      pagesize: 10,
      total: 10,
      deleteDialog: false,
      addDialog: false,
      modifyDialog: false,
      categorySearch: '',
      problemSearch: '',
      problem: { questionId: 0, category: '', content: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '', score: 5 },
      index: 0
    }
  },
  created() {
    this.getAllProblem()
  },
  methods: {
    getAllProblem() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/question/all',
        timeout: 30000
      }).then(res => {
        console.log(res)
        this.problemList = res.data.data
        this.total = this.problemList.length
      })
    },
    searchPrbByCtn() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/question/searchByContent',
        timeout: 30000,
        params: {
          content: this.problemSearch
        }
      }).then(res => {
        console.log(res)
        this.problemList = res.data.data
        this.total = this.problemList.length
      })
    },
    searchPrbByCtg() {
      axios({
        method: 'get',
        url: 'http://localhost:8084/question/searchByCategory',
        timeout: 30000,
        params: {
          category: this.categorySearch
        }
      }).then(res => {
        console.log(res)
        this.problemList = res.data.data
        this.total = this.problemList.length
      })
    },
    deleteD(index) {
      this.index = index
      this.deleteDialog = true
    },
    modifyD(index) {
      this.index = index
      this.problem = this.problemList.find(x => x.questionId === index)
      this.modifyDialog = true
    },
    modifyProblem() {
      const data = this.problem
      // this.problemList[this.index] = this.problem
      axios({
        method: 'put',
        url: 'http://localhost:8084/question/update',
        timeout: 30000,
        data
      }).then(res => {
        console.log(res)
        this.getAllProblem()
      })

      this.problem = { questionId: 0, category: '', content: '', options: '', answer: '', score: 0 }
      this.modifyDialog = false
    },
    deleteProblem() {
      // console.log(this.index)
      // this.problemList.splice(this.index, 1)
      axios({
        method: 'delete',
        url: 'http://localhost:8084/question/delete/' + this.index,
        timeout: 30000
      }).then(res => {
        console.log(res)
        this.getAllProblem()
      })

      this.deleteDialog = false
    },
    addProblem() {
      // this.problem.id = this.problemList[this.problemList.length - 1].id + 1
      // this.problemList.push(this.problem)
      const data = this.problem
      axios({
        method: 'post',
        url: 'http://localhost:8084/question/add',
        timeout: 30000,
        data
      }).then(res => {
        console.log(res)
        this.getAllProblem()
      })

      this.problem = { questionId: 0, category: '', content: '', options: '', answer: '', score: 0 }
      this.addDialog = false
    },
    filterType(value, row) {
      return row.category === value
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}

.input{
  width: 200px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: block;
}
</style>
