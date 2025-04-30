import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';
import { axiosClient } from '../api/axios';
/* import '../table.css' */
const AfficherEntree = () => {
  const { id } = useParams();
  const [entree, setEntree] = useState(null);
  const [entreeline, setEntreeline] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/entrees/more/${id}`);
        console.log(response.data[0][0]);
        setEntree(response.data[0][0]);
        setEntreeline(response.data[1]);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error);
      }
    };
    fetchCategories();
  }, [id]); 

  const handlePrint = () => {
    window.print();
  };

  const handlePDF = () => {
    if (!entree) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const imgWidth = 30;
    const imgHeight = 30;
    const imageUrl = '/fslogo-1.png';

   
    doc.addImage(imageUrl, 'PNG', 10, 5, imgWidth, imgHeight);

    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text("Université Chouaïb Doukkali", pageWidth / 2, 15, { align: 'center' });
    doc.text("Faculté Des Sciences", pageWidth / 2, 22, { align: 'center' });
    doc.text("El Jadida", pageWidth / 2, 29, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Fiche d'entrée N° ${entree.id}`, pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(12);
    let y = 65;

    y += 10;
    doc.line(15, y, 195, y);
    y += 10;
    const addInfo = (label, value, x1, x2) => {
      doc.setFont('helvetica', 'bold').text(label, x1, y);
      doc.setFont('helvetica', 'normal').text(String(value || ''), x2, y);
      y += 10;
    };

    y = 100;
    
    addInfo('Frs:',entree.raison , 20, 30)
   addInfo('Date:',entree.date, 20, 33)
   
    y = 100;

    addInfo('NumFactBL:',entree.numFactBL, 95, 120)
    
   
    y = 100;
    addInfo('Observation:',entree.observation, 155, 183)
    addInfo('Type:',entree.type, 155, 170)

    
    y += 15;
    doc.line(15, y, 195, y);
    y += 10;

   
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Liste des Articles', 105, y, { align: 'center' });
    y += 10;

    const headers = ["#", "ID Ligne", "Article ID", "Désignation", "Quantité"];
    const colWidths = [10, 25, 25, 90, 25];
    let x = 15;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    headers.forEach((header, index) => {
      doc.setFillColor(135, 206, 235);
      doc.rect(x, y, colWidths[index], 8, 'F');
      doc.text(String(header), x + 2, y + 6);
      x += colWidths[index];
    });

    y += 8;
    doc.setFont('helvetica', 'normal');

    entreeline.forEach((line, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      x = 15;
      const values = [
        idx + 1,
        line.id,
        line.art_id,
        String(line.designation).slice(0, 40),
        line.quantite,
      ];

      values.forEach((val, i) => {
        doc.rect(x, y, colWidths[i], 8);
        doc.text(String(val), x + 2, y + 6);
        x += colWidths[i];
      });

      y += 8;
    });

    doc.save(`entree_${entree.id}_fiche.pdf`);
  };

  return (
    <div className="details">
      
      {entree ? (
        <div className='g' >
          <h1 className="Class">
            Informations de l'entrée N° {entree.id}
          </h1>
          <div className="DEV">
  <div className="left">
    <div className='F'>
      <strong>FRS:</strong> {entree.raison}
    </div>
    <div className='F'>
      <strong>Type:</strong> {entree.type}
    </div>
    <div className='F'>
      <strong>Numéro:</strong> {entree.numero}
    </div>
  </div>

 
  <div className="center">
    <div className='Date'>
      <strong>Date:</strong> {entree.date}
    </div>
  </div>


  <div className="right">
    <div className='O'>
      <strong>NumFactBL:</strong> {entree.numFactBL}
    </div>
    <div className='O'>
      <strong>Observation:</strong> {entree.observation}
    </div>
  </div>
</div>

<div className="flex justify-center gap-6 mt-10">
            <button
              onClick={handlePrint}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#fff',
                color: '#4CAF50',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Imprimer
            </button>
            <button
              onClick={handlePDF}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Exporter en PDF
            </button>
          </div>
          <div className="">
          

            <div className="table-container" >
              <table  >
                <thead >
                  <tr>
                    <th>#</th>
                    {/* <th >ID Ligne</th>
                    <th >Article ID</th> */}
                    <th >Designation</th>
                    <th >Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {entreeline.map((line, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                      <td >{index + 1}</td>
                      {/* <td >{line.id}</td>
                      <td >{line.art_id}</td> */}
                      <td >{line.designation}</td>
                      <td >{line.quantite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">Chargement des données...</div>
      )}
    </div>
  );
};

export default AfficherEntree;
