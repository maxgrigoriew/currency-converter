<template>
   <div>
      <v-col cols="12" md="12" lg="9" xl="6" class="mx-auto">
         <h1 class="text-center mb-4">Конвертор валют</h1>
         <v-row justify="space-between" no-gutters>
            <v-col cols="12" md="5">
               <v-row no-gutters>
                  <v-col class="px-1" cols="3">
                     <v-select @change="convert" v-model="selected[0]" :items="countries"
                               label="У меня есть"></v-select>
                  </v-col>
                  
                  <v-col class="px-1" cols="9">
                     <v-text-field @change="convert" v-model="inputed"></v-text-field>
                     <div>{{ splitString }}</div>
                     <!--                           <v-text-field @input="convert" v-model="inputed" :rules="[rules.onlyNumbers]"></v-text-field>-->
                  </v-col>
               </v-row>
            </v-col>
            
            <v-col cols="2" offset="5" offset-md="0" class="d-flex justify-center align-center">
            </v-col>
            
            <v-col cols="12" md="5">
               <v-row no-gutters>
                  <v-col class="px-1" cols="9">
                     <v-text-field v-model="result" type="number" readonly></v-text-field>
                  </v-col>
                  
                  <v-col class="px-1" cols="3">
                     <v-select @change="convert" v-model="selected[1]" :items="countries"
                               label="Хочу приобрести"></v-select>
                  </v-col>
               </v-row>
            </v-col>
         </v-row>
      </v-col>
   </div>
</template>

<script>

const axios = require('axios').default;

export default {
   
   name: 'ConverterPage',
   
   data() {
      return {
         valutes: {},
         selected: ['RUB', 'USD'],
         inputed: "",
         result: null,
         countries: ['RUB'],
         // rules: {
         //    onlyNumbers: (value) => {
         //       const pattern = /^\d+$/.test(value);
         //
         //       if (!pattern) this.inputed = this.inputed.replace(/\D/g, '');
         //
         //       return true;
         //    }
         // }
      }
   },
   computed: {
      splitString() {
         let splitString = this.inputed.split(' ')
         let amount = splitString[0]
         let firstValute = splitString[1]
         let secondValute = splitString[3]
         return [amount, firstValute, secondValute]
      }
   },
   methods: {
      convert() {
         let [amount, firstValute, secondValute] = this.splitString
         firstValute = firstValute.toUpperCase()
         this.$set(this.selected, this.selected[0], firstValute)
         this.$set(this.selected, this.selected[1], secondValute)
         console.log(this.selected[0])
         this.selected[0] = 'EUR'
         console.log(this.selected[0])
         secondValute = secondValute.toUpperCase()
         console.log('log', amount, firstValute, secondValute)
         // Default valute values / RUB
         let defaultValute = {
            Value: 1,
            Nominal: 1
         };
         // let findFalute = this.valutes.find((valute) => valute == this.splitString[1])
         // console.log(findFalute)
         // First selected valute details
         // firstValute = this.valutes[this.selected[0]] ?? defaultValute
         let firstValuteValue = firstValute.Value * Number(amount)
         let firstValuteNominal = firstValute.Nominal;
         console.log(firstValuteNominal)
         // Second selected valute details
         secondValute = this.valutes[this.selected[1]] ?? defaultValute
         let secondValuteValue = secondValute.Value
         let secondValuteNominal = secondValute.Nominal
         
         // Result calculating
         let result = (firstValuteValue / firstValuteNominal) / (secondValuteValue / secondValuteNominal);
         
         // Rounding to ten thousandths
         this.result = result ? Math.floor(result * 10000) / 10000 : null;
      }
   },
   
   mounted() {
      // Request to API URL, getting response
      axios
          .get('https://www.cbr-xml-daily.ru/daily_json.js')
          .then(response => {
             this.valutes = response.data.Valute;
             console.log(this.valutes)
             // Adding all charCodes to array
             for (let code in response.data.Valute) {
                this.countries.push(code)
             }
             console.log(this.countries)
          })
          .catch(error => {
             console.log(error)
          })
   },
};

</script>

<style lang="scss">


</style>