import { useEffect, useState } from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker";
import NotaEditor from "./src/componentes/NotaEditor";

import { Nota } from "./src/componentes/Nota"
import { buscaNotas, criaTabela } from "./src/componentes/servicos/Notas";

export default function App() {

  useEffect(() => {
    criaTabela();
    mostraNotas();
  }, [])

const [notaSelecionada, setNotaSelecionada] = useState({})
const [notas, setNotas] = useState([]);
const [filtro, setFiltro] = useState("Todos");

  async function mostraNotas(filtro = 'Todos') {
    const todasNotas = await buscaNotas(filtro)
    setNotas(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style = {estilos.modalPicker}>
        <Picker
          selectedValue={filtro}
          onValueChange = {(novoFiltro) => {setFiltro(novoFiltro); mostraNotas(novoFiltro)}}>
            <Picker.Item label = "Todos" value = "Todos" />
            <Picker.Item label = "Pessoal" value = "Pessoal" />
            <Picker.Item label = "Trabalho" value = "Trabalho" />
            <Picker.Item label = "Outros" value = "Outros" />
        </Picker>
      </View>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
})