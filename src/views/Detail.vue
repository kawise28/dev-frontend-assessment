<template>
    <div>
      <div class="primary-heading-con">
          <div class="heading">
              <div class="title">Symbols/Tickers</div>
          </div>

          <div class="page-content-con is-fluid">
            <loading v-if="loading"></loading>
            <div v-else>
                <div>
                    <h1>{{companyName}}</h1>
                    <p><strong>{{CEO}}</strong></p>
                    <p>{{description}}</p>
                    <p><a v-bind:href="''+website+''" target="_blank">{{website}}</a></p>
                    <p>{{industry}}</p>
                    <p>{{symbol}}</p>
                    <p>{{exchange}}</p>

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
            companyName: '',
            exchange : '',
            industry: '',
            filter:'',
            symbol:'',
            CEO:'',
            description: '',
            website: '',
            industry: '',
            exchange: ''
        };
    },
    beforeMount () {
        var symbol = this.$route.params.symbol;

        API.getCompanyDetail(symbol).then(response => {
            this.companyName = response.data.companyName;
            this.CEO = response.data.CEO;
            this.description = response.data.description;
            this.website = response.data.website;
            this.industry = response.data.industry;
            this.exchange = response.data.exchange;
            this.symbol = response.data.symbol;
            
            console.log(response.data);
        }).finally(() => {
            this.loading = false;
        });
    },
    methods:{
    },
    computed:{
    }
}
</script>