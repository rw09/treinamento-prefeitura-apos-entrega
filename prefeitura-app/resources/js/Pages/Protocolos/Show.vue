<template>
    <Head title="Protocolos - Detalhes" />

        <section class="mx-5 md:mx-30 lg:mx-40 xl:mx-80 space-y-4 shadow-md pb-8 mb-6 rounded-md border">
            <nav class="flex bg-gray-200 mb-6">
                <div class="flex">
                    <label for="opcao-protocolo" class="py-3.5 px-4 cursor-pointer hover:bg-white hover:rounded-tl" v-bind:class="{'bg-gray-50 rounded-tl font-semibold' : opcao === 'protocolo'}">
                        <input type="radio" value="protocolo" id="opcao-protocolo" name="opcao" v-model="opcao" class="hidden">
                            Protocolo
                        </label>
                    <label for="opcao-contribuinte" class="py-3.5 px-4 cursor-pointer hover:bg-white" v-bind:class="{'bg-gray-50 font-semibold' : opcao === 'contribuinte'}">
                        <input type="radio" value="contribuinte" id="opcao-contribuinte" name="opcao" v-model="opcao" class="hidden">Contribuinte
                    </label>
                    <label for="opcao-acompanhamentos" class="py-3.5 px-4 cursor-pointer hover:bg-white" v-bind:class="{'bg-gray-50 font-semibold' : opcao === 'acompanhamentos'}">
                        <input type="radio" value="acompanhamentos" id="opcao-acompanhamentos" name="opcao" v-model="opcao" class="hidden">Acompanhamentos
                    </label>
                    <label for="opcao-anexos" class="py-3.5 px-4 cursor-pointer hover:bg-white" v-bind:class="{'bg-gray-50 font-semibold' : opcao === 'anexos'}">
                        <input type="radio" value="anexos" id="opcao-anexos" name="opcao" v-model="opcao" class="hidden">Anexos
                    </label>
                </div>
                <div v-if="opcao === 'protocolo'" class="flex space-x-1 w-full justify-end pr-3 items-center rounded-tr bg-gradient-to-r from-gray-200 to-gray-50 border-b">
                    <Link class="p-1 text-white rounded bg-sky-600/90 hover:bg-blue-300" v-bind:href="route('protocolos-edit', protocolo.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                    </Link>
                    <button class="p-1 text-white rounded bg-rose-600/80 hover:bg-red-300" @click="excluirProtocolo(protocolo)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </nav>

            <section class="px-8 py-4" v-if="opcao === 'protocolo'">
                <h1 class="font-semibold text-lg mx-auto w-fit mb-4">Protocolo # {{protocolo.id}}</h1>
                <h2 class="text-md font-semibold mt-4">Descrição:</h2>
                <p class="border-gray-200 border bg-gray-100 py-2.5 px-3.5 rounded break-words">{{ protocolo.descricao }}</p>
                <h2 class="text-md font-semibold mt-4">Data Cadastro:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ new Date(protocolo.created_at).toLocaleString('pt-BR') }}</p>
                <h2 class="text-md font-semibold mt-4">Prazo:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.prazo }} dias</p>
                <h2 class="text-md font-semibold mt-4">Quantidade de Acompanhamentos:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.acompanhamentos_count }}</p>
                <h2 class="text-md font-semibold mt-4">Quantidade de Anexos:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.anexos_count }}</p>
                <Link :href="route('departamentos-show', protocolo.departamento.id)">
                    <h2 class="text-md font-semibold mt-4">Departamento:</h2>
                    <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.departamento.nome}}</p>
                </Link>
                <button class="mt-5 flex bg-orange-400 hover:bg-orange-300 px-3 py-2 rounded text-white" @click="pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                        </svg>
                        Download PDF
                </button>
            </section>

            <section class="px-8 py-4" v-if="opcao === 'contribuinte'">
                <Link :href="route('contribuintes-show', protocolo.contribuinte.id)">
                    <h1 class="font-semibold text-lg mx-auto w-fit mb-4">Contribuinte # {{protocolo.contribuinte.id}}</h1>
                </Link>
                <h2 class="text-md font-semibold mt-4">Nome:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.nome }}</p>
                <h2 class="text-md font-semibold mt-4">Data de Nascimento:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ new Date(protocolo.contribuinte.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC'}) }}</p>
                <h2 class="text-md font-semibold mt-4">CPF:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}</p>
                <h2 class="text-md font-semibold mt-4">Sexo:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.sexo === "M" ? "Masculino" : "Feminino" }}</p>
                <h2 class="text-md font-semibold mt-4">Rua:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.rua ? protocolo.contribuinte.rua : '---' }}</p>
                <h2 class="text-md font-semibold mt-4">Número:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.numero ? protocolo.contribuinte.numero : '---' }}</p>
                <h2 class="text-md font-semibold mt-4">Complemento:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.complemento ? protocolo.contribuinte.complemento : '---' }}</p>
                <h2 class="text-md font-semibold mt-4">Bairro:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.bairro ? protocolo.contribuinte.bairro : '---' }}</p>
                <h2 class="text-md font-semibold mt-4">Cidade:</h2>
                <p class="border-gray-200 border bg-gray-100 p-2.5 rounded">{{ protocolo.contribuinte.cidade ? protocolo.contribuinte.cidade : '---' }}</p>
            </section>
        

            <section class="px-8 py-4" v-if="opcao === 'acompanhamentos'">
                <details id="detailsAcompanhamento" class="mb-8">
                    <summary class="text-white bg-teal-500 hover:bg-teal-400 px-4 py-2 w-fit cursor-pointer">Novo Acompanhamento</summary>
                    <form @submit.prevent="add" class="pb-12 mt-4 p-4 rounded shadow-md bg-gray-100 flex flex-col">
                        <h1 class="self-center font-semibold mb-4">Registrar Novo Acompanhamento</h1>
                        <label for="observacao" class="text-sm">Observação:</label>
                        <textarea v-model="form.observacao" cols="70" rows="5" class="p-4 border" id="observacao">
                        </textarea>
                        <button type="submit" class="mt-8 px-4 py-2 rounded font-medium bg-teal-500 text-white hover:bg-teal-400" :disabled="form.processing">Registrar Acompanhamento</button>
                    </form>
                </details>

                <input v-if="acompanhamentos.length" type="search" id="filtragem" v-model="filtro" placeholder="Filtrar" class="px-3 mt-1 mb-5 py-1.5 w-2/3 border rounded text-sm">

                <div v-if="acompanhamentos.length === 0" class="text-center mt-10 text-sm">Protocolo não possui acompanhamentos</div>


                <div class="border-gray-200 border bg-gray-100 p-4 rounded-md flex flex-col mb-3" v-for="acompanhamento, index in filtros">
                    <div class="flex justify-between">
                        <div>
                            <h1 class="font-semibold text-lg">Acompanhamento # {{ acompanhamentos.length - index }} </h1>
                            <p class="text-xs">{{ new Date(acompanhamento.created_at).toLocaleString('pt-BR') }}</p>
                        </div>
                        <div class="flex space-x-1 items-start">
                            <Link class="p-1 text-white rounded bg-sky-600/90 hover:bg-blue-300" v-bind:href="route('acompanhamentos-edit', acompanhamento.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </Link>
                            <button class="p-1 text-white rounded bg-rose-600/80 hover:bg-red-300" @click="removeAcompanhamento(acompanhamento, index)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="mt-5">{{ acompanhamento.observacao }}</p>
                    <div class="mt-8">
                        <Link :href="route('users-show', acompanhamento.user_id)">
                            <p><span class="font-semibold">Cadastrado pelo Usuário:</span> {{ acompanhamento.user_id }} - {{ acompanhamento.user.name }}</p>
                        </Link>
                    </div>
                </div>
            </section>



            <section class="px-8 py-4" v-if="opcao === 'anexos'">
                <details id="detailsAnexo" class="mb-8" v-if="anexos.length < 5">
                    <summary class="text-white bg-teal-500 hover:bg-teal-400 px-4 py-2 w-fit cursor-pointer">Anexar Arquivo</summary>
                    <form @submit.prevent="addAnexo" class="pb-12 mt-4 p-4 rounded shadow-md bg-gray-100 flex flex-col">
                        <label for="inputAnexos">Anexar Documentos:</label>
                        <p class="text-xs pb-1">Máximo {{ qtdeArquivosPossivel }} arquivo{{qtdeArquivosPossivel != 1 ? 's' :'' }} (.jpg, .jpeg, .png ou .pdf) com até 3MB cada</p>
                        <input id="inputAnexos" type="file" multiple accept=".jpg, .jpeg, .png, .pdf" @change="anexar">
                        <button type="submit" v-bind:class="anexosSelecionados ? 'text-white bg-teal-500 hover:bg-teal-400' : 'bg-gray-300 text-gray-400'" class="mt-8 px-4 py-2 rounded font-medium" :disabled="anexosSelecionados == false">Fazer Upload</button>
                    </form>
                </details>

                <div v-if="anexos.length === 0" class="text-center mt-10 text-sm">Protocolo não possui anexos</div>

                <div class="border-gray-200 border bg-gray-100 p-4 rounded-md flex flex-col mb-3" v-for="anexo in anexos">
                    <div class="flex justify-between">
                        <div>
                            <h1 class="font-semibold text-lg">Anexo # {{ anexo.id }} </h1>
                            <p class="text-xs">{{ new Date(anexo.created_at).toLocaleString('pt-BR') }}</p>
                        </div>
                        <div class="flex space-x-1 items-start">
                            <a :href="'/protocolos/download/' + anexo.id" class="p-1 text-white rounded bg-lime-600/90 hover:bg-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                </svg>
                            </a>
                            <button @click="removeAnexo(anexo)" type="submit" class="p-1 text-white rounded bg-rose-600/80 hover:bg-red-300" v-bind="anexo.id">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="mt-5"><span class="font-semibold">Nome:</span> {{ anexo.name }}</p>
                    
                    <div class="mt-8">
                        <p><span class="font-semibold">Caminho: </span>{{ anexo.caminho }}</p>
                    </div>
                </div>
            </section>        
        </section>
        
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { usePage, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';

    const opcao = ref('protocolo');

    const filtro = ref('')

    const filtros = computed(() => {
        if(filtro.value === '') {
            return props.acompanhamentos;    
        } else {
            return props.acompanhamentos.filter(acompanhamento => (acompanhamento.observacao.toLowerCase().includes(filtro.value.toLowerCase())));
        }
    });

    const page = usePage();

    const props = defineProps({
        protocolo: Object,
        acompanhamentos: Object,
        anexos: Object,
    });

    const anexosSelecionados = ref(false);


    const qtdeArquivosPossivel = computed(() => {
        return 5 - props.anexos.length;
    })


    let form = useForm({
        protocolo_id: props.protocolo.id,
        user_id: page.props.auth.user.id,
        observacao: null,
        anexos: '',
    });

    let add = () => {
        form.post(route('protocolos-add-acompanhamento'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {[
                Swal.fire({
                    title: 'Sucesso!',
                    html: page.props.flash.message,
                    timer: 2500,
                    icon: 'success',
                }),  
                form.reset('observacao'),
                fecharDetail()
            ]}
        });
    }

    const anexar = (e) => {
        if(e.target.files) 
        {
            const tamanhoMaximoArquivo = 3 * 1024 * 1024;
            const extensoesSuportadas = ["application/pdf", "image/jpg", "image/jpeg", "image/png"];

            if(e.target.files.length > qtdeArquivosPossivel.value)
            {
                avisoErroAnexo('Erro!<br> Quantidade de anexos', `A quantidade de arquivos permitidos é <b>${qtdeArquivosPossivel.value}</b>`);
                e.target.value = null
                return;
            }
            for(let i = 0; i < e.target.files.length ; i++)
            {
                if (e.target.files[i].size > tamanhoMaximoArquivo) 
                {
                    //depois melhorar
                    avisoErroAnexo('Erro!<br> Tamanho Inválido', 'Arquivo <b>' + e.target.files[i].name + '</b> <br><br>Tamanho máximo de cada arquivo permitido é <b>3MB</b>');
                    e.target.value = null
                    return;
                }
                if(!extensoesSuportadas.includes(e.target.files[i].type))
                {
                    avisoErroAnexo('Erro!<br> Formato Inválido', 'Arquivo <b>' + e.target.files[i].name + '</b> <br><br>Formatos Permitidos: <b><br>.jpg  .jpeg .png  .pdf</b>');
                    e.target.value = null
                    return;
                }
            }
            form.anexos = e.target.files;
            anexosSelecionados.value = true;
        }
    }

    const avisoErroAnexo = (errorTitle, msg) => {
        Swal.fire({
            timer: 3500,
            title: errorTitle,
            html: msg,
            icon: 'warning',
        })
    };

    let addAnexo = () => {
        form.post(route('protocolos-add-anexo'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {[
                Swal.fire({
                    title: 'Sucesso!',
                    html: page.props.flash.message,
                    timer: 2500,
                    icon: 'success',
                }),  
                limparSelecao(),
            ]}
        });
    }

    let limparSelecao = () => {
        anexosSelecionados.value = false;

        if(props.anexos.length < 5) {
            let inputAnexos = document.getElementById('inputAnexos')
            inputAnexos.value = ""

            let detailsAnexo = document.getElementById('detailsAnexo')
            detailsAnexo.removeAttribute('open')
        }

        
    }

    let fecharDetail = () => {
        let detailsAcompanhamento = document.getElementById('detailsAcompanhamento')
        detailsAcompanhamento.removeAttribute('open')
    }

    let formAnexos = useForm({
        protocolo_id: props.protocolo.id,

    });

    let removeAnexo = (anexo) => {
        Swal.fire({
            title: 'Confirma exclusão desse Anexo?',
            html: "<b>ID:</b> " + anexo.id + '<br>' + '<b>Nome:</b> ' + anexo.name + '<br>' + "<b>Caminho:</b> " + anexo.caminho,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    formAnexos.delete(route('protocolos-remove-anexo', anexo.id));
                    Swal.fire({
                        timer: 2500,
                        title: 'Deletado!',
                        text: 'Anexo removido com sucesso.',
                        icon: 'success',
                    }),
                    limparSelecao()
                }
        })
    };

    const removeAcompanhamento = (acompanhamento, index) => {
        Swal.fire({
            title: 'Confirma exclusão desse Acompanhamento?',
                html: "<b>Acompanhamento #" + (props.acompanhamentos.length - index) + "</b>"
            + "<br><b>Observação:</b> " + acompanhamento.observacao
            + "<br><b>Data:</b> " + new Date(acompanhamento.created_at).toLocaleString('pt-BR')
            + "<br><b>Usuário:</b> " + acompanhamento.user_id + " - " + acompanhamento.user.name,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar!',
                })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('protocolos-remove-acompanhamento', acompanhamento.id));
                    Swal.fire({
                    timer: 2500,
                    title: 'Deletado!',
                    text: 'Acompanhamento excluído com sucesso.',
                    icon: 'success',
                })
            }
        })
    }
    import axios from 'axios';
    const pdf = () => {
        try {
            let protocolo = form.protocolo_id;
            
            console.log(protocolo)

            axios.post('/protocolos/pdf', { protocolo }, 
                { responseType: 'blob' })
                .then(res => {
                    let blob = new Blob([res.data], { type: res.headers['content-type'] });
                    let link = document.createElement('a');

                    link.href = window.URL.createObjectURL(blob);
                    link.download = `Protocolo-${protocolo}.pdf`;
                    link.click()
                }).catch(err => {
                    console.log('Erro na resposta: ' + err)
                });
        } catch (error) {
            console.log('Erro ao gerar PDF: ', error);
        }
    }        

    let excluirProtocolo = (protocolo) => {
        //alert('Protocolo: ' + protocolo.descricao + '\n será excluído quando a função for implementada :D')
        Swal.fire({
            title: 'Confirma exclusão desse Protocolo?',
            html: "<b>ID:</b> " + protocolo.id + '<br>' + "<b>Descrição:</b> " + protocolo.descricao + "<br><b>Solicitante:</b> " + protocolo.contribuinte_id + " - " + protocolo.contribuinte.nome 
            + "<br><b>Departamento:</b> " + protocolo.departamento_id + " - " + protocolo.departamento.nome
            + "<br><b>Data:</b> " + new Date(protocolo.created_at).toLocaleString('pt-BR') + "<br><b>Prazo:</b> " + protocolo.prazo + " dias"
            + "<br><b>Situação:</b> " + (protocolo.situacao == 1 ? 'Concluído' : 'Pendente' ),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar!',
        })
        .then((result) => {
            if (result.isConfirmed) {
                router.delete(route('protocolos-destroy', protocolo.id), {
                    onSuccess: () => {[
                        Swal.fire({
                            title: 'Deletado!',
                            html: 'Protocolo excluído com sucesso.',
                            timer: 2500,
                            icon: 'success',
                        }),
                    ]},
                    onError: () => {[
                        Swal.fire({
                            title: 'Erro!',
                            html: 'Não foi possível deletar o Protocolo',
                            timer: 2500,
                            icon: 'error',
                        }),
                    ]}
                });
            }
        })
    }

</script>