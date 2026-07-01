// lib/generateInvoice.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (paymentData, cartItems, cartTotal) => {
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: `Invoice - ${paymentData.orderId || paymentData._id}`,
    subject: "Purchase Invoice",
    author: "Amar Dokan",
    creator: "Amar Dokan POS System",
  });

  // Company Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 40, "F");

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Amar Dokan", 14, 20);

  // Company Details
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("123, Main Street, Dhaka-1205, Bangladesh", 14, 28);
  doc.text("Phone: +880 1234-567890 | Email: support@amardokan.com", 14, 34);

  // Invoice Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 150, 20, { align: "right" });

  // Invoice Details
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No: ${paymentData.orderId || paymentData._id}`, 150, 28, {
    align: "right",
  });
  doc.text(
    `Date: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    150,
    34,
    { align: "right" },
  );

  // Horizontal Line
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 45, 196, 45);

  // Customer Information
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Bill To:", 14, 55);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(paymentData.customerName || "Walk-in Customer", 14, 62);
  doc.text(`Phone: ${paymentData.phone || "N/A"}`, 14, 68);
  doc.text(
    `Address: ${paymentData.address || "N/A"}, ${paymentData.city || ""} ${paymentData.postalCode || ""}`,
    14,
    74,
  );
  if (paymentData.email) {
    doc.text(`Email: ${paymentData.email}`, 14, 80);
  }

  // Payment Information
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Payment Details:", 120, 55);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const paymentMethodLabels = {
    cash: "Cash",
    card: "Card",
    mobile: "Mobile Banking",
    bkash: "bKash",
  };
  doc.text(
    `Payment Method: ${paymentMethodLabels[paymentData.paymentMethod] || paymentData.paymentMethod || "N/A"}`,
    120,
    62,
  );

  if (paymentData.paymentMethod === "cash" && paymentData.receivedAmount) {
    doc.text(
      `Received: $${parseFloat(paymentData.receivedAmount).toFixed(2)}`,
      120,
      68,
    );
    const changeAmount = parseFloat(paymentData.receivedAmount) - cartTotal;
    if (changeAmount > 0) {
      doc.text(`Change: $${changeAmount.toFixed(2)}`, 120, 74);
    }
  }

  if (paymentData.deliveryDate) {
    doc.text(
      `Delivery: ${paymentData.deliveryDate} ${paymentData.deliveryTime || ""}`,
      120,
      80,
    );
  }

  // Items Table
  const tableColumn = ["#", "Product", "Code", "Unit Price", "Qty", "Total"];
  const tableRows = [];

  cartItems?.forEach((item, index) => {
    const itemData = [
      index + 1,
      item.productName || "Product",
      item.productCode || "N/A",
      `$${parseFloat(item.price).toFixed(2)}`,
      item.quantity || 1,
      `$${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}`,
    ];
    tableRows.push(itemData);
  });

  // Add empty rows if less than 5 items for better appearance
  while (tableRows.length < 5) {
    tableRows.push(["", "", "", "", "", ""]);
  }

  const startY = paymentData.email ? 88 : 82;

  // Use autoTable correctly with the imported function
  autoTable(doc, {
    startY: startY,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [60, 60, 60],
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 50 },
      2: { cellWidth: 30, halign: "center" },
      3: { cellWidth: 30, halign: "right" },
      4: { cellWidth: 15, halign: "center" },
      5: { cellWidth: 30, halign: "right" },
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { left: 14, right: 14 },
  });

  // Get the final Y position after the table
  const finalY = doc.lastAutoTable.finalY + 10;

  // Totals Section
  const subtotal = cartTotal || 0;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Draw a line before totals
  doc.setDrawColor(220, 220, 220);
  doc.line(120, finalY, 196, finalY);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text("Subtotal:", 120, finalY + 8);
  doc.text(`$${subtotal.toFixed(2)}`, 196, finalY + 8, { align: "right" });

  doc.text("Tax (5%):", 120, finalY + 16);
  doc.text(`$${tax.toFixed(2)}`, 196, finalY + 16, { align: "right" });

  doc.setDrawColor(220, 220, 220);
  doc.line(120, finalY + 22, 196, finalY + 22);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Total:", 120, finalY + 32);
  doc.setTextColor(37, 99, 235);
  doc.text(`$${total.toFixed(2)}`, 196, finalY + 32, { align: "right" });

  // Notes Section
  if (paymentData.notes) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text(`Notes: ${paymentData.notes}`, 14, finalY + 45);
  }

  // Footer
  const footerY = doc.internal.pageSize.height - 20;
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.line(14, footerY - 10, 196, footerY - 10);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(128, 128, 128);
  doc.text("Thank you for shopping with us!", 105, footerY - 4, {
    align: "center",
  });
  doc.text(
    "This is a computer-generated invoice and does not require a signature.",
    105,
    footerY + 2,
    { align: "center" },
  );
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, footerY + 8, {
    align: "center",
  });
  doc.text(
    `Generated By: ${paymentData.userName || "N/A"}`,
    105,
    footerY + 14,
    {
      align: "center",
    },
  );

  // Save the PDF
  const fileName = `Invoice_${paymentData.orderId || paymentData._id}_${new Date().getTime()}.pdf`;
  doc.save(fileName);

  return fileName;
};
