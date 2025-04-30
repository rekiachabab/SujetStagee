import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";

const AfficherSortie = () => {
  const { id } = useParams();
  const [sortie, setSortie] = useState(null);
  const [sortielines, setSortielines] = useState([]);

  useEffect(() => {
    const fetchSortie = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sorties/more/${id}`);
        setSortie(response.data[0][0]);
        setSortielines(response.data[1]);
      } catch (error) {
        console.error('Erreur lors du chargement des données de sortie', error);
      }
    };

    if (id) fetchSortie();
  }, [id]);

  const handlePDF = () => {
    if (!sortie) return;

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
    doc.text(`Fiche de Sortie N° ${sortie.id}`, pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(12);
    let y = 70;
    doc.line(15, y, 195, y);
    y += 10;

    const addInfo = (label, value, x1, x2) => {
      doc.setFont('helvetica', 'bold').text(label, x1, y);
      doc.setFont('helvetica', 'normal').text(String(value || ''), x2, y);
      y += 10;
    };
    y = 100;
     
    addInfo('Responsable:', sortie.responsable, 20, 50);
    addInfo('Date BL:', sortie.date_bl, 20, 45);
    addInfo('Type:', sortie.type, 20, 35);
    y = 100;

    addInfo('NumFactBL:', sortie.numFactBL, 95, 120);
    y = 100;

    addInfo('Numéro BL:', sortie.numero_bl, 155, 183);
    addInfo('Entrée:', sortie.numFactBL, 155, 170);

    y += 10;
    doc.line(15, y, 195, y);
    y += 10;

    doc.setFontSize(14).setFont('helvetica', 'bold').text('Liste des Articles', pageWidth / 2, y, { align: 'center' });
    y += 10;

    const headers = ["#", "ID Ligne", "Article ID", "Num Inventaire", "Désignation", "Quantité"];
    const colWidths = [10, 25, 25, 45, 50, 30];
    let x = 15;

    doc.setFontSize(10).setFont('helvetica', 'bold');

    headers.forEach((header, index) => {
      doc.setFillColor(135, 206, 235);
      doc.rect(x, y, colWidths[index], 8, 'F');
      doc.text(header, x + colWidths[index] / 2, y + 6, { align: 'center' });
      x += colWidths[index];
    });

    y += 8;
    doc.setFont('helvetica', 'normal');

    sortielines.forEach((line, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      x = 15;
      const values = [
        idx + 1,
        line.id,
        line.art_id,
        `${line.num_invent}/${line.type_invt}/${line.ansinvt}`,
        line.designation,
        line.quantite,
      ];

      values.forEach((val, i) => {
        doc.rect(x, y, colWidths[i], 8);
        doc.text(String(val), x + 2, y + 6);
        x += colWidths[i];
      });

      y += 8;
    });

    doc.save(`sortie_${sortie.id}_fiche.pdf`);
  };

  return (
    <div className="details">
      {sortie ? (
        <>
          <h1 className="Class">Détail de la ligne - Sortie N° {id}</h1>
          <div className="DEV">
            <div className="left">
              <div className='F'><strong>Responsable:</strong> {sortie.responsable}</div>
              <div className='F'><strong>Type:</strong> {sortie.type}</div>
            </div>
            <div className="center">
              <div className='Date'><strong>Date BL:</strong> {sortie.date_bl}</div>
            </div>
            <div className="right">
              <div className='O'><strong>Entrée:</strong> {sortie.numFactBL}</div>
              <div className='O'><strong>Numéro BL:</strong> {sortie.numero_bl}</div>
            </div>
          </div>

          <div className="grou">
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
              Télécharger PDF
            </button>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Désignation</th>
                    <th>Num Inventaire</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {sortielines.length > 0 ? (
                    sortielines.map((line, index) => (
                      <tr key={line.id || index}>
                        <td>{index + 1}</td>
                        <td>{line.designation}</td>
                        <td>{`${line.num_invent}/${line.type_invt}/${line.ansinvt}`}</td>
                        <td>{line.quantite}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>Aucune ligne disponible</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default AfficherSortie;
