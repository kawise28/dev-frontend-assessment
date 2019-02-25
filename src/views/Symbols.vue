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
                  <select>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="All">All</option>
                  </select>
                </label>
              </div>

              <div class="column is-6">
                <label>
                  <span>Search</span>
                  <input type="search" class="">
                </label>
              </div>
            </div>

            <table class="table is-fullwidth is-striped is-hoverable">

               <thead>
                <tr class="columns">
                  <th class="column is-6">Company Name<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em>
                  </span></th>
                  <th class="column is-2">Symbol<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                  <th class="column is-2">Open<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                  <th class="column is-2">Close<span class="icon" aria-hidden="true"><em class="fas fa-sort"></em></span></th>
                </tr>
               </thead>

               <tbody>
                <tr
                  v-for="company in companies"
                  :key="company.symbol"
                  class="columns"
                >
                    <!-- <h5 class="heading is-size-5">{{company.symbol}} : <small class="is-size-7">{{company.companyName}}</small></h5>
                    <div>Open <money :value="company.open"></money></div>
                    <div>Close <money :value="company.close"></money></div>
                    <timestamp :value="company.openTime"></timestamp> - <timestamp :value="company.closeTime"></timestamp> -->
                    
                      <td class="column is-6"><a v-bind:href="url" v-bind:title="props">{{company.companyName}}</a></td>
                      <td class="column is-2">{{company.symbol}}</td>
                      <td class="column is-2">{{company.open}}</td>
                      <td class="column is-2">{{company.close}}</td>
                    
                </tr>
              </tbody>

              </table>

              <div class="columns table-paging">
              
              <div class="column is-6">
                
                <div class="showing-container">
                  <p>Showing 1 - 10</p>
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
            url: '#',
            loading : true,
            props: ['title'],
            companies : [
              {
                label: 'Company Name',
                field: 'company name',
                sort: 'asc'
              },
              {
                label: 'Symbol',
                field: 'symbol',
                sort: 'asc'
              },
              {
                label: 'Open',
                field: 'open',
                sort: 'asc'
              },
              {
                label: 'Close',
                field: 'close',
                sort: 'asc'
              }
            ],
        };
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            this.companies = response.data;
        }).finally(() => {
            this.loading = false;
        });
    },
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
