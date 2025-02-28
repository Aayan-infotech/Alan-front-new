import{r as c,j as e}from"./index-DL5taDVF.js";import{a as P}from"./index-DW_MHI2K.js";import{c as m,a as C}from"./index.esm-BZN3EXKz.js";import{c as u}from"./ManageOrders-BLfzlGw1.js";import{C as v,a as M}from"./CCardBody-D1K57JHO.js";import{C as A}from"./CCardHeader-YPvH19q6.js";import{C as o,a as I,b as t,c as r,d as h,e as l,f as p,g as D,h as f,i as y,j as S}from"./CTable-DPqkE7aM.js";import"./DefaultLayout-Bp0ODGA1.js";import"./cil-user-Ddrdy7PS.js";const R=()=>{const[w,b]=c.useState([]),[a,x]=c.useState(null),[O,i]=c.useState(!1),[j,n]=c.useState(!1);c.useEffect(()=>{P.get("http://18.221.196.222:7878/api/FnalCustData/getAllCustData").then(s=>{const d=s.data.filter(T=>T.orderStatus==="Cancelled");b(d)}).catch(s=>console.error("Error fetching orders:",s))},[]);const N=s=>{x(s),i(!0)},g=s=>{if(!s.paymentId||!s.paidAmount){alert("No payment details available for this order.");return}x({...s}),n(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs(v,{className:"order-card",children:[e.jsx(A,{className:"order-card-header",children:"Cancelled Orders"}),e.jsx(M,{children:e.jsxs(o,{hover:!0,responsive:!0,className:"order-table",children:[e.jsx(I,{children:e.jsxs(t,{children:[e.jsx(r,{children:"#"}),e.jsx(r,{children:"Order ID"}),e.jsx(r,{children:"Customer Name"}),e.jsx(r,{children:"Order Date"}),e.jsx(r,{children:"Order Details"}),e.jsx(r,{children:"Payment Status"}),e.jsx(r,{children:"Payment Details"})]})}),e.jsx(h,{children:w.map((s,d)=>e.jsxs(t,{className:"order-row",children:[e.jsx(l,{children:d+1}),e.jsx(l,{children:s.order_id}),e.jsx(l,{children:s.customerName}),e.jsx(l,{children:new Date(s.date).toLocaleDateString()}),e.jsx(l,{children:e.jsxs("div",{className:"action-icon",onClick:()=>N(s),children:[e.jsx(m,{icon:u})," View"]})}),e.jsx(l,{children:s.paymentStatus}),e.jsx(l,{children:e.jsxs("div",{className:"action-icon",onClick:()=>g(s),children:[e.jsx(m,{icon:u})," View"]})})]},s.order_id))})]})})]}),a&&e.jsxs(p,{visible:O,onClose:()=>i(!1),size:"xl",children:[e.jsx(D,{children:e.jsx(f,{children:"Order Details"})}),e.jsx(y,{children:e.jsx(o,{bordered:!0,children:e.jsxs(h,{children:[e.jsxs(t,{children:[e.jsx(r,{style:{width:"25%",color:"red"},children:"Order ID"}),e.jsx(l,{style:{width:"25%"},children:a.order_id}),e.jsx(r,{style:{width:"25%",color:"red"},children:"Order Date"}),e.jsx(l,{style:{width:"25%"},children:new Date(a.date).toLocaleDateString()})]}),e.jsxs(t,{children:[e.jsx(r,{style:{color:"red"},children:"Product"}),e.jsx(l,{colSpan:3,children:a.productName})]}),e.jsxs(t,{children:[e.jsx(r,{style:{color:"red",height:"100px"},children:"Product Details"}),e.jsx(l,{colSpan:3,style:{verticalAlign:"top"},children:a.selectedOptions&&Object.entries(a.selectedOptions).map(([s,d])=>e.jsxs("li",{children:[e.jsxs("strong",{children:[s,":"]})," ",d]},s))})]}),e.jsxs(t,{children:[e.jsx(r,{style:{color:"red"},children:"Product Value"}),e.jsx(l,{colSpan:3,children:e.jsx("div",{className:"text-end",children:`USD ${a.totalPrice}/-`})})]})]})})}),e.jsx(S,{children:e.jsx(C,{color:"secondary",onClick:()=>i(!1),children:"Close"})})]}),a&&j&&e.jsxs(p,{visible:j,onClose:()=>n(!1),size:"xl",children:[e.jsx(D,{children:e.jsx(f,{children:"Payment Details"})}),e.jsx(y,{children:e.jsx(o,{bordered:!0,children:e.jsxs(h,{children:[e.jsxs(t,{children:[e.jsx(r,{rowSpan:5,className:"fw-bold text-success text-center align-middle",style:{verticalAlign:"middle"},children:"Payment"}),e.jsx(r,{className:"fw-bold",children:"Transaction ID"}),e.jsx(l,{children:a.paymentId})]}),e.jsxs(t,{children:[e.jsx(r,{className:"fw-bold",children:"Transaction Date"}),e.jsx(l,{children:new Date(a.date).toLocaleDateString()})]}),e.jsxs(t,{children:[e.jsx(r,{className:"fw-bold",children:"Transaction Status"}),e.jsx(l,{children:a.paymentStatus})]}),e.jsxs(t,{children:[e.jsx(r,{className:"fw-bold",children:"Transaction Amount"}),e.jsxs(l,{children:["USD ",a.paidAmount,"/-"]})]})]})})}),e.jsx(S,{children:e.jsx(C,{color:"secondary",onClick:()=>n(!1),children:"Close"})})]})]})};export{R as default};
