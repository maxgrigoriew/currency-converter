<template>
   <v-col md="12" lg="9" xl="6" class="mx-auto">
      <h1 class="text-center mb-4">Курс валют на сегодня</h1>
      <v-row>
         <v-col cols="6">Базовая валюта: {{ defaultValute.Name }}</v-col>
         <v-col>
            <v-select v-model="selected[0]"
                      :items="countries"
                      item-text="Name"
                      label="Выберите валюту"
                      item-value="CharCode">
            
            </v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-simple-table class="table">
               <template>
                  <thead>
                  <tr>
                     <th class="text-left">
                        Код
                     </th>
                     <th class="text-left">
                        Номинал
                     </th>
                     <th class="text-left">
                        Валюта
                     </th>
                     <th class="text-left">
                        Курс
                     </th>
                     <th class="text-left">
                        Изменение
                     </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="valute in valutes" :key="valute.name">
                     <td>{{ valute.CharCode }}</td>
                     <td>{{ valute. Nominal}}</td>
                     <td>{{ valute.Name }}</td>
                     <td>{{ valute.Value }}</td>
                     <td>
                        {{ valute.Previous }}
                        <span v-if="valute.Value > valute.Previous" style="color: green"
                        >▲</span
                        >
                        <span
                            v-else-if="valute.Value === valute.Previous"
                            style="color: black"
                        ></span
                        >
                        <span v-else style="color:red">▼</span>
                     </td>
                  </tr>
                  </tbody>
               </template>
            </v-simple-table>
         </v-col>
      </v-row>
   </v-col>
</template>

<script>
import axios from "axios"
import {thistle} from "color-name"

export default {
   name: "CurrencyOnlinePage",
   data() {
      return {
         valutes: {},
         copyValutes: {},
         selected: ["USD"],
         countries: [],
         defaultValute: {},
      }
   },
   methods: {
      fetchValute() {
         axios
             .get("https://www.cbr-xml-daily.ru/daily_json.js")
             .then((response) => {
                this.copyValutes = JSON.parse(JSON.stringify(response.data.Valute))
                this.valutes = JSON.parse(JSON.stringify(this.copyValutes))
                this.defaultValute = this.valutes["USD"]
                this.calculateCurency()
                this.countries = Object.values(response.data.Valute).map((obj) => {
                  return {
                     Name: obj.Name,
                     CharCode: obj.CharCode
                  }
                })
             })
             .catch((error) => {
                console.log(error)
             })
      },
      calculateCurency() {
         let copyValutes = JSON.parse(JSON.stringify(this.copyValutes))
         this.defaultValute = Object.values(this.copyValutes).find((obj) => obj.CharCode == this.selected)
         for (let valute in copyValutes) {
            let secondValuteValue = copyValutes[valute].Value
            let firstValuteValue = this.defaultValute.Value
            let firstValuteNominal = copyValutes[valute].Nominal
            let secondValuteNominal = copyValutes[valute].Nominal
            let firstValutePrevious = this.defaultValute.Previous
            let secondValutePrevious = copyValutes[valute].Previous
            let newValuteValue = firstValuteValue / firstValuteNominal / (secondValuteValue / secondValuteNominal)
            let newValutePrevios = firstValutePrevious / secondValutePrevious
            this.valutes[valute].Value = newValuteValue.toFixed(6)
            this.valutes[valute].Previous = newValutePrevios.toFixed(6)
         }
         console.log(this.defaultValute)
      }
   },
   watch: {
      selected() {
         this.calculateCurency()
      }
   },
   mounted() {
      this.fetchValute()
   },
}
</script>

<style scoped>
.table {
   max-height: 500px;
   overflow-y: scroll;
}
</style>
