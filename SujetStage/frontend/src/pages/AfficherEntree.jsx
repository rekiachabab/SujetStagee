import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

const AfficherEntree = () => {
  const { id } = useParams();
  const [entree, setEntree] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data'));

    if (storedData) {
      const found = storedData.find((item) => item.id === parseInt(id));
      setEntree(found);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handlePDF = () => {
    const doc = new jsPDF();

    doc.text(`Informations de l'entrée N° ${entree.id}`, 10, 10);
    doc.text(`FRS: ${entree.frs}`, 10, 20);
    doc.text(`Type: ${entree.type}`, 10, 30);
    doc.text(`Numéro: ${entree.numero}`, 10, 40);
    doc.text(`NumFactBL: ${entree.numFactBL}`, 10, 50);
    doc.text(`Observation: ${entree.observation}`, 10, 60);
    doc.text(`Date: ${entree.date}`, 10, 70);
    

    let yOffset = 80;
    doc.text('Articles:', 10, yOffset);
    entree.lines.forEach((line) => {
      yOffset += 10;
      doc.text(`Article: ${line.article} - Quantité: ${line.quantite}`, 10, yOffset);

    });

    doc.save('entree.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      {entree ? (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-8">
            Informations de l'entrée N° {entree.id}
          </h2>

          <div className="grid grid-cols-2 gap-6 text-gray-700 text-base mb-10">
            <div><span className="font-semibold">FRS:</span> {entree.frs}</div>
            <div><span className="font-semibold">Type:</span> {entree.type}</div>
            <div><span className="font-semibold">Numéro:</span> {entree.numero}</div>
            <div><span className="font-semibold">NumFactBL:</span> {entree.numFactBL}</div>
            <div><span className="font-semibold">Observation:</span> {entree.observation}</div>
            <div><span className="font-semibold">Date:</span> {entree.date}</div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Liste des Articles</h3>
            {entree.lines && entree.lines.length > 0 ? (
              <div className="grid gap-4">
                {entree.lines.map((line, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="text-gray-800 font-medium">
                      Article: {line.article}
                    </div>
                    <div className="text-gray-800 font-medium">
                      Quantité: {line.quantite}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun article ajouté.</p>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Imprimer
            </button>
            <button
              onClick={handlePDF}
              className="px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition duration-200"
            >
              Exporter en PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">Chargement des données...</div>
      )}
    </div>
  );
};

export default AfficherEntree;