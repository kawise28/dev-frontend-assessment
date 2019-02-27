<template>
    <div>
      <div class="primary-heading-con">
          <div class="heading">
              <div class="title">Symbols/Tickers</div>
          </div>
      </div>

      <div class="page-content-con is-fluid">
          <loading v-if="loading"></loading>
          <div v-else>

            <div class="columns table-sort-search">
              
              <div class="column is-6">
                
                <label>
                  <span>Show</span>
                  <select v-model="pageSize">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="All">All</option>
                  </select>
                </label>
              </div>

              <div class="column is-6">
                <label>
                  <span>Search</span>
                  <input v-model="searchTerm" type="search">
                </label>
              </div>
            </div>

            <table class="table is-fullwidth is-striped is-hoverable">

               <thead>
                <tr class="columns">
                  <th @click="sort('companyName')" class="column is-4">Company Name<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em>
                  </span></th>
                  <th @click="sort('primaryExchange')" class="column is-2">Primary Exchange<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                  <th @click="sort('symbol')" class="column is-2">Symbol<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                  <th @click="sort('open')" class="column is-2">Open<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                  <th @click="sort('close')" class="column is-2">Close<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                </tr>
               </thead>

               <tbody>
                <tr
                  v-for="company in sortedCompanies"
                  :key="company.symbol"
                  class="columns"
                >
                    <!-- <h5 class="heading is-size-5">{{company.symbol}} : <small class="is-size-7">{{company.companyName}}</small></h5>
                    <div>Open <money :value="company.open"></money></div>
                    <div>Close <money :value="company.close"></money></div>
                    <timestamp :value="company.openTime"></timestamp> - <timestamp :value="company.closeTime"></timestamp> -->
                    
                      <td class="column is-4"><a :href="'/detail/' + company.symbol" v-bind:title="props">{{company.companyName}}</a></td>
                      <td class="column is-2">{{company.primaryExchange}}</td>
                      <td class="column is-2">{{company.symbol}}</td>
                      <td class="column is-2">{{company.open}}</td>
                      <td class="column is-2">{{company.close}}</td>
                    
                </tr>
              </tbody>

              </table>

              <div class="columns table-paging">
              
              <div class="column is-6">
                
                <div class="showing-container">
                  <p>Showing 1 - {{pageSize}}</p>
                </div>
              </div>

              <div class="column is-6">
                <ul class="paging">
                  <li class="paging-button previous">Previous</li>
                  <li class="page active"><a href="#">1</a></li>
                  <li class="page"><a href="#">2</a></li>
                  <li class="page"><a href="#">3</a></li>
                  <li class="page"><a href="#">4</a></li>
                  <li class="page"><a href="#">5</a></li>
                  <li class="page"><a href="#">6</a></li>
                  <li class="paging-button next">Next</li>
                  
                </ul>
              </div>
            </div>

            debug: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}
          </div>
      </div>

    </div>
</template>

<script>
import API from '../api/IEX';
export default {
    name : "Symbols",
    data () {
        return {
            loading : true,
            companies : [],
            searchTerm: '',
            filter:'comapnyName, symbol',
            currentSort:'name',
            currentSortDir:'asc',
            pageSize:"10",
            currentPage:1
        };
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            this.companies = response.data;

            console.log(this.companies)
        }).finally(() => {
            this.loading = false;
        });
    },
    methods:{
      sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
    },
    computed:{
      sortedCompanies:function() {
        var sortedList = this.companies;      
        var self = this;

        if(this.searchTerm != '')
        {
          sortedList = this.companies.filter(function(company){return company.companyName.toLowerCase().indexOf(self.searchTerm.toLowerCase())>=0;});
        }

        if(self.pageSize != "All")
        {
          var pSize = parseInt(self.pageSize);
          sortedList = sortedList.slice(0, pSize);
        }
        sortedList = sortedList.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });

        return sortedList;
      }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/_theme';
    .company {
        margin-bottom:10px;
        padding-bottom:10px;
        border-bottom:1px solid $white-ter;
    }
</style>
