function buscarCEP() {
    // Obtém o valor do input de CEP
    const cep = document.getElementById('cep').value;
    //validacao necessaria para cidades brasileiras
    // Verifica se o CEP possui 8 dígitos
    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    // URL da API ViaCEP para obter a resposta em XML
    const url = `https://viacep.com.br/ws/${cep}/xml/`;

    // Faz a requisição usando fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return response.text();
        })
        
        .then(data => {
            // Parser para XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            
            // Seleciona os elementos do XML
            const logradouro = xmlDoc.getElementsByTagName('logradouro')[0]?.textContent || 'N/A';
            const bairro = xmlDoc.getElementsByTagName('bairro')[0]?.textContent || 'N/A';
            const localidade = xmlDoc.getElementsByTagName('localidade')[0]?.textContent || 'N/A';
            const uf = xmlDoc.getElementsByTagName('uf')[0]?.textContent || 'N/A';

            // Exibe o resultado na tela
            document.getElementById('resultado').innerHTML = `
                <h2>Resultado:</h2>
                <p><strong>CEP:</strong> ${cep}</p>
                <p><strong>Logradouro:</strong> ${logradouro}</p>
                <p><strong>Bairro:</strong> ${bairro}</p>
                <p><strong>Localidade:</strong> ${localidade}</p>
                <p><strong>UF:</strong> ${uf}</p>
            `;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').innerHTML = `<p>Erro ao buscar o CEP.</p>`;
        });
}
