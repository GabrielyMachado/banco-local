import { useEffect, useState } from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor";

import { Nota } from "./src/componentes/Nota"
import { criaTabela } from "./src/componentes/servicos/Notas";

export default function App() {

  useEffect(() => {
    criaTabela();
  }, [])

const [notas, setNotas] = useState([]);

  async function mostraNotas() {

    setNotas(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} />}
        keyExtractor={nota => nota[0]}
      />
      <NotaEditor/>
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
})