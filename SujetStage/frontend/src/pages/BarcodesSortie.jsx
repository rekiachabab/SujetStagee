import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import JsBarcode from 'jsbarcode';
import { axiosClient } from '../api/axios';
import jsPDF from 'jspdf';

const BarcodesSortie = () => {
  const { id } = useParams();
  const [lines, setLines] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/api/sortie-lines/${id}`);
        setLines(response.data);
      } catch (error) {
        console.error('Erreur chargement lignes sortie :', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    lines.forEach((line, index) => {
      const barcodeValue = `${line.num_invent}/${line.type_invt}/${line.ansinvt}`;
      JsBarcode(`#barcode-${index}`, barcodeValue, {
        format: "CODE128",
        width: 1,
        height: 60,
        displayValue: true
      });
    });
  }, [lines]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    let x = 65, y = 20; 

    pdf.setFontSize(16);
    pdf.text(`Barcodes de la Sortie N° ${id}`, 60, 10);

    lines.forEach((line, index) => {
      const svg = document.getElementById(`barcode-${index}`);
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', x, y, 80, 20);
        

        y += 40;
        if (y > 270) {
          y = 20;
          pdf.addPage();
        }

        if (index === lines.length - 1) {
          pdf.save(`Barcodes_Sortie_${id}.pdf`);
        }
      };
      img.src = 'data:image/svg+xml;base64,' + window.btoa(svgString);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div  ref={printRef} className="barcode-page">
      <h2 className="barcode-title">Barcodes de la Sortie N° {id}</h2>
     
      <div >
        <button onClick={handleDownloadPDF}    className="barcode-PDF" >
          Télécharger PDF
        </button>
        <button onClick={handlePrint}   className="barcode-Imprimer" >
          Imprimer
        </button>
      </div>

     
      <div  className="barcode-list" >
        {lines.map((line, index) => (
          <div key={index}>
            <svg id={`barcode-${index}`}></svg>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarcodesSortie;