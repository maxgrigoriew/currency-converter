<template>
   <v-col md="12" lg="9" xl="6" class="mx-auto">
      <h1 class="text-center mb-4">Курс валют на сегодня</h1>
      <v-row>
         <v-col cols="6">Выберите валюту: {{ selected }}</v-col>
         <v-col>
            <v-select v-model="selected[0]"
                      :items="countries"
                      item-text="Name"
                      item-value="CharCode">
            
            </v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-simple-table>
               <template>
                  <thead>
                  <tr>
                     <th class="text-left">
                        Валюта
                     </th>
                     <th class="text-left">
                        Курс
                     </th>
                     <th class="text-left">
                        Предудущее значение
                     </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="valute in valutes" :key="valute.name">
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
                        >▲▼</span
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
         inputed: "",
         result: null,
         countries: [
           
         ],
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
                this.defaultValute = {...this.valutes["EUR"]}
                for (let valute in this.valutes) {
                   let object = this.valutes[valute]
                   
                   let secondValuteValue = object.Value
                   let firstValuteValue = this.defaultValute.Value
                   let newValuteValue = firstValuteValue / secondValuteValue
                   
                   let secondValutePrevious = object.Previous
                   let firstValutePrevious = this.defaultValute.Previous
                   let newValutePrevios = firstValutePrevious / secondValutePrevious
                   this.valutes[valute].Value = newValuteValue.toFixed(4)
                   this.valutes[valute].Previous = newValutePrevios.toFixed(4)
                }
                this.countries = Object.values(response.data.Valute).map((obj) => {
                  return {
                     Name: obj.Name,
                     CharCode: obj.CharCode
                  }
                })
                console.log(this.countries)
             })
             .catch((error) => {
                console.log(error)
             })
      },
   },
   watch: {
      selected(one, two) {
         console.log(one, two)
         let copyValutes = JSON.parse(JSON.stringify(this.copyValutes))
         this.defaultValute = Object.values(this.copyValutes).find((obj) => obj.CharCode == this.selected)
         for (let valute in copyValutes) {
            let secondValuteValue = copyValutes[valute].Value
            let firstValuteValue = this.defaultValute.Value
            let newValuteValue = firstValuteValue / secondValuteValue
            
            let secondValutePrevious = copyValutes[valute].Previous
            let firstValutePrevious = this.defaultValute.Previous
            let newValutePrevios = firstValutePrevious / secondValutePrevious
            this.valutes[valute].Value = newValuteValue.toFixed(4)
            this.valutes[valute].Previous = newValutePrevios.toFixed(4)
         }
      }
   },
   mounted() {
      this.fetchValute()
   },
}
</script>

<style scoped></style>
