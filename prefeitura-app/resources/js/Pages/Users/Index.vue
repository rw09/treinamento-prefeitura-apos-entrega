<template>
    <Head title="Usuários - Listagem" />

    <section class="container my-6 mx-auto text-xs">
        <section class="flex justify-between mb-1">
            <div class="flex items-center py-2">
                
                <Link v-bind:href="route('users-create')" class="py-1.5 px-3 rounded-sm text-sm text-white bg-teal-500 hover:bg-teal-400">
                    Cadastrar Usuário
                </Link>
            </div>
            <div class="grid grid-cols-3 gap-x-1 py-2">
                <button @click="show" v-bind:class="linhaSelecionada ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-300 cursor-default'" class="px-2 py-1 rounded-sm  text-white">Detalhes</button>
                <button @click="edit" v-bind:class="linhaSelecionada ? 'bg-sky-600/90 hover:bg-blue-400' : 'bg-gray-300 cursor-default'" class="px-2 py-1 rounded-sm  text-white">Editar</button>
                <button @click="remove" v-bind:class="linhaSelecionada ? 'bg-rose-600/80 hover:bg-red-400' : 'bg-gray-300 cursor-default'" class="px-2 py-1 rounded-sm  text-white">Deletar</button>
            </div>
        </section>

        <section class="container py-1 mx-auto text-xs">
            <DataTable id="datatable" :data="users" :columns="columns" :options="options" ref="table" class="display nowrap" width="100%" @select="mostrarBotoes" @deselect="esconderBotoes">
                <thead class="bg-gray-200">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Data Cadastro</th>
                        <th>Perfil de Acesso</th>
                        <th>Nº Departamentos</th>
                    </tr>
                </thead>
            </DataTable>
        </section>
    </section>
</template>

<script setup>
import { router, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

    let page = usePage();

    let dt;
    const table = ref();

    onMounted(function () {
        dt = table.value.dt;

        if(page.props.flash.message) {
            Swal.fire({
                title: 'Sucesso!',
                html: page.props.flash.message,
                timer: 2500,
                icon: 'success',
            })  
            page.props.flash.message = null
        } 
    });

    const columns = [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: null, render: data => data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') },
        { data: null, render: data => new Date(data.created_at).toLocaleString('pt-BR')},
        { data: null, render: data => data.perfil === 0 ? data.perfil + ' - ' + "Administrador da TI" : (data.perfil === 1 ? data.perfil + ' - ' + "Administrador do Sistema" : data.perfil + ' - ' + "Operador") },
        { data: null, render: data => data.perfil === 2 ? data.departamentos_count : 'Acesso Total' },
    ];

    const options = {
        responsive: true,
        select: 'single',
        language: {
            search: 'Pesquisar:',
            emptyTable: "Sem dados disponíveis",
            zeroRecords: 'Nenhum registro encontrado',
            info: 'Mostrando de _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: "Mostrando de 0 a 0 de um total de 0 registros",
            paginate: {first: 'Primeira', last: 'Última', previous: 'Anterior', next: 'Próxima'},
            lengthMenu: "Registros por página: _MENU_  &nbsp",
            infoFiltered: "(filtrados de um total de _MAX_ registros)",
            select: { rows: { }}
        }
    };


    let linhaSelecionada = ref(false);

    let mostrarBotoes = () => {
        linhaSelecionada.value = true;
    }

    let esconderBotoes = () => {
        linhaSelecionada.value = false;
    }

    const show = () => {
        if(linhaSelecionada.value === true) {
            let row = dt.row({ selected: true }).data();
            router.get(route('users-show', row.id));
            
        } else {
            avisoSemLinhaSelecionada('Visualizar')
        }
    };

    const edit = () => {
        if(linhaSelecionada.value === true) {
            let row = dt.row({ selected: true }).data();
            router.get(route('users-edit', row.id));

        } else {
            avisoSemLinhaSelecionada('Editar')
        }        
    };

    const remove = () => {
        if(linhaSelecionada.value === true) {
            let row = dt.row({ selected: true }).data();
            Swal.fire({
                title: 'Confirma exclusão desse Usuário?',
                html: "<b>ID:</b> " + row.id + '<br>' + '<b>Nome:</b> ' + row.name + '<br>' + "<b>E-mail:</b> " + row.email + '<br><b>CPF:</b> ' + row.cpf + "<br><b>Perfil de Acesso:</b> " + (row.perfil === 0 ? "Administrador da TI" : (row.perfil === 1 ? "Administrador do Sistema" : "Operador")),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('users-destroy', row.id), {
                        onSuccess: () => {[
                            Swal.fire({
                                timer: 2500,
                                title: 'Deletado!',
                                text: 'Usuário excluído com sucesso.',
                                icon: 'success',
                            })
                        ]},
                        onError: () => {[
                            Swal.fire({
                                title: 'Erro!',
                                html: 'Não foi possível deletar o Usuário',
                                timer: 2500,
                                icon: 'error',
                            }),
                        ]}
                    });
   
            }
            linhaSelecionada.value = false;
            })
        } else {
            avisoSemLinhaSelecionada('Deletar')
        }  
    };

    const avisoSemLinhaSelecionada = (msg) => {
        Swal.fire({
            timer: 2500,
            title: 'Nenhum Registro Selecionado!',
            text: 'Selecione o Usuário que deseja ' + msg,
            icon: 'warning',
        })
    }

    const props = defineProps({ users: Object });
</script>