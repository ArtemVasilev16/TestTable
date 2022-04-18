<template lang="pug">
    .container 
        .filters 
            input.filters-login__input(@input="filterByLogin" :value="filter.login" placeholder="Логин")
            input.filter-tofrom__from(@input="filterOrdersFrom" :value="filter.from" type="number" placeholder="От...")
            input.filter-tofrom__to(@input="filterOrdersTo" :value="filter.to" type="number" placeholder="До...")
            select.filter-select__button(@change="filterByStatus")
                option(v-for="status in filter.statuses" :value="status") {{status}}

        .table-container
            table
                caption Контроль заказов
                thead
                tr
                    th Место
                    th(@click="sortByLogin") Логин
                    th(@click="sortByApprovedOrders") Подтвержденные заказы
                    th(@click="sortByStatus") Статус
                tbody
                tr(v-for="user in users")
                    td {{ user.place }}
                    td {{ user.login }}
                    td {{ user.approvedOrders }}
                    td {{ user.status }}
</template>

<script>
const USERS = [
    {
        place: 1,
        login: 'smith@gmail.com',
        approvedOrders: 312,
        status: 'Ценитель красоты'
    }, 
    {
        place: 2,
        login: 'lenin@gmail.com',
        approvedOrders: 120,
        status: 'Поставщик аксессуаров'
    },
    {
        place: 3,
        login: 'mask@gmail.com',
        approvedOrders: 98,
        status: 'Конкурент минздрава'
    },
    {
        place: 4,
        login: 'dog@mail.ru',
        approvedOrders: 64,
        status: 'Рыбак'
    },
    {
        place: 5,
        login: 'nightmare@mail.ru',
        approvedOrders: 34,
        status: 'Охотник'
    },
    {
        place: 6,
        login: 'cat@mail.ru',
        approvedOrders: 1,
        status: 'Ценитель красоты'
    }
]
export default {
    data() {
        return {
            filter: {
                login: '',
                statuses: [
                    'Выбрать статус',
                    'Ценитель красоты',
                    'Охотник',
                    'Рыбак'
                ],
                from: '',
                to: ''
            },
            sorting: {
                login: false,
                status: false, 
                approvedOrders: false
            },
            users: USERS,
            initialUsers: USERS
        }
    },
    methods: {
        sortByLogin() {
            if (this.sorting.login === "asc") {
                this.users.sort((a, b) => {
                    if (a.login < b.login) {
                        return 1
                    } else if (a.login > b.login) {
                        return -1
                    } 
                }) 
                this.sorting.login = "desc"
            } else {
                this.users.sort((a, b) => {
                    if (a.login < b.login) {
                        return -1
                    } else if (a.login > b.login) {
                        return 1
                    } 
                }) 
                this.sorting.login = "asc"
            }
        }, 
        sortByStatus() {
            if (this.sorting.status === "asc") {
                this.users.sort((a, b) => {
                    if (a.status < b.status) {
                        return 1 
                    } else if (a.status > b.status) {
                        return -1
                    }
                })
                this.sorting.status = "desc"
            } else {
                this.users.sort((a, b) => {
                    if (a.status < b.status) {
                        return -1
                    } else if (a.status > b.status) {
                        return 1
                    }
                })
                this.sorting.status = "asc"
            }
        }, 
        sortByApprovedOrders() { 
            if (this.sorting.approvedOrders === "asc") {
                this.users.sort((a, b) => {
                    return b.approvedOrders - a.approvedOrders
                }) 
                this.sorting.approvedOrders = "desc"
            } else {
                this.users.sort((a, b) => {
                    return a.approvedOrders - b.approvedOrders
                })
                this.sorting.approvedOrders = "asc"
            }
        }, 
        filterByLogin(event) { 
            this.filter.login = event.target.value
            if (event.target.value === '') {
                this.users = this.initialUsers
                return
            }
            const filteredUsers = this.users.filter((user) => {
                return user.login.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            this.users = filteredUsers
        },
        filterByStatus(event) {
            const filtered = this.initialUsers.filter((user) => {
                return user.status === event.target.value;
            });
            this.users = filtered;
        }, 
        filterOrdersTo(event) {
            this.filter.to = event.target.value
            const filteredByTo = this.initialUsers.filter((user) => {
                if (this.filter.from) {
                return user.approvedOrders < Number(event.target.value) && user.approvedOrders > this.filter.from
                }
                return user.approvedOrders < Number(event.target.value);
            });
            this.users = filteredByTo;
        }, 
        filterOrdersFrom(event) {
            this.filter.from = event.target.value
            const filteredByFrom = this.initialUsers.filter((user) => {
                if (this.filter.to) {
                return user.approvedOrders > Number(event.target.value) && user.approvedOrders < this.filter.to
                }
                return user.approvedOrders > Number(event.target.value);
            });
            this.users = filteredByFrom;
        }, 
    }
}
</script>


<style lang="scss">
.link {
  position: absolute;
  top: 0;
  left: 0;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
}

caption {
  padding-bottom: 10px;
}

td,
th {
  padding: 10px;
  border: 1px solid black;
}

table {
    min-width: 400px;
    position: relative;
}

.table-container {
    overflow-y: auto;
}

// @media screen and (max-width: 900px) {
    
//     .form-wrapper {
//         flex-wrap: wrap;
//         justify-content: center;
//     }
// }

</style>