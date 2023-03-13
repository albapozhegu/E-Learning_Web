// import Grid from "@material-ui/core/Grid";
// import { ROUTES } from "../constants";
// import useTitle from "../hooks/useTitle";
// import React from "react";
// import "./style/dictionary.scss";
// import Banner from "components/Banner";
// import Contact from "components/Contacts";
// import {FaMicrosoft, FaCoffee, FaLanguage,FaLaptopHouse, FaLayerGroup, FaGrin} from 'react-icons/fa';


// function DictionaryPage() {
//   useTitle('Study');
// //const classes= useStyle();
//   return (
// <div class="dictionary-content">
		       
//         <div class="dictionary-body">
            
           
// <div class="dictionary-form">
    
//     <div class="dictionary-form-content">
//         <form autoComplete="off">
//             <input type="text" class="input-dictionary" placeholder="Nhập từ tiếng Anh bạn muốn tìm" required=""/>
//             <button class="ui-button btn-dictionary" type="button">Tra từ</button>
//             <img src="https://www.voca.vn/assets/images/dictionary-flag.svg" alt=""/>
//         </form>
//     </div>
// </div>
		
			
										
// 				<div class="dictionary-result">
// 					<div class="dictionary-result-content">

// 													<h3 class="ui-heading">Kết quả tra từ</h3>
// <div class="result-content">
//     <span class="word">book</span>
    
// </div>
// <div class="result-table">
//     <table>
//         <thead>
//             <tr>
//                 <th class="word">Từ</th>
//                 <th class="word-form">Loại từ</th>
//                 <th class="definition">Định nghĩa</th>
//                 <th class="sample">Câu ví dụ</th>
//             </tr>
//         </thead>
//         <tbody>
//                         <tr>
//                 <td class="word" t="6669" d="400518005" w="16028">
//                     <div>
//                         <div class="d-word">
//                             <div class="word-left">
// 																	<a href="javascript:void(0)" class="btn-pin"></a>
// 								                            </div>
//                             <div class="word-right">
//                                 book
//                             </div>
                            
//                         </div>
//                         <div class="d-pronounce">
//                                                         <div class="pronounce-us"><a href="javascript:void(0)" link="https://www.voca.vn/assets/sounds/5boidpadir2xlzhrx93cggivqudvbbzsn8ujirk4k9g.mp3" class="sound us"></a> <span>/bʊk/</span></div>
//                                                                                     <div class="pronounce-uk"><a href="javascript:void(0)" link="https://www.voca.vn/assets/sounds/wonstfyiopkkysyscdq28fahj7ww7ulofoawpozu.mp3" class="sound uk"></a> <span>/bʊk/</span></div>
//                                                     </div>
                        
//                     </div>
//                 </td>
//                 <td class="word-form">n</td>
//                 <td class="definition">cuốn sách, quyển sách</td>
//                 <td class="sample">
//                     <span>Her name was inscribed in the book.</span>

//                                         <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Tên của bà được in lên quyển sách.">Dịch</a>
                                        
//                 </td>
//             </tr>
//                         <tr>
//                 <td class="word" t="2671" d="400518313" w="16028">
//                     <div>
//                         <div class="d-word">
//                             <div class="word-left">
// 																	<a href="javascript:void(0)" class="btn-pin"></a>
// 								                            </div>
//                             <div class="word-right">
//                                 book
//                             </div>
                            
//                         </div>
//                         <div class="d-pronounce">
//                                                         <div class="pronounce-us"><a href="javascript:void(0)" link="https://www.voca.vn/assets/sounds/ervfj702sfsfl33pdoizk9tt9pvzdc06meqfekxtb0e.mp3" class="sound us"></a> <span>/bʊk/</span></div>
//                                                                                     <div class="pronounce-uk"><a href="javascript:void(0)" link="https://www.voca.vn/assets/sounds/y6ftcvcahinfce7g7q2h1lfiofvnj4jglmrjoifoeyi.mp3" class="sound uk"></a> <span>/bʊk/</span></div>
//                                                     </div>
                        
//                     </div>
//                 </td>
//                 <td class="word-form">v</td>
//                 <td class="definition">đặt trước, đặt chỗ</td>
//                 <td class="sample">
//                     <span>She'd booked a table for four at their favourite restaurant.</span>

//                                         <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Cô ấy đã đặt một bàn 4 người tại nhà hàng ưa thích của họ.">Dịch</a>
                                        
//                 </td>
//             </tr>
                       
//         </tbody>
//     </table>
// </div>						
// 													<div class="result-relate">
//     <h3 class="ui-heading">Từ liên quan</h3>
// </div>
// <div class="result-relate-content">
// 	<div class="result-relate-left">
// 		<div class="relate-left">
// 	   	     		<div class="relate-item ">
		
// 			<div class="relate-word">
// 				<a href="https://www.voca.vn/dictionary/book%20fair">book fair</a>
// 			</div>
// 			<div class="relate-word-form">(n)</div>
// 			<div class="relate-definition"><p>hội sách</p></div>
// 		</div>
// 					     		<div class="relate-item ">
		
// 			<div class="relate-word">
// 				<a href="https://www.voca.vn/dictionary/coloring%20book">coloring book</a>
// 			</div>
// 			<div class="relate-word-form">(n)</div>
// 			<div class="relate-definition"><p>sách tô màu</p></div>
// 		</div>
// 					     		<div class="relate-item ">
		
// 			<div class="relate-word">
// 				<a href="https://www.voca.vn/dictionary/comic%20book">comic book</a>
// 			</div>
// 			<div class="relate-word-form">(n)</div>
// 			<div class="relate-definition"><p>truyện tranh</p></div>
// 		</div>
// 					     			     			     				</div>
		
		
// 	</div>
// 	<div class="result-relate-right">
// 		<div class="relate-right-ads"><div id="ads-banner-zone-1"></div></div>
// 	</div>
// </div>
// <div class="clearfix"></div>

// 																	<p class="result-tag">Từ khóa tìm kiếm: <span>book meaning, book definition, book nghĩa là gì, nghĩa của từ book</span></p>
// 											</div>
// 				</div>
			
										

//         </div>
       

//     </div>
    

//   );
// }

// export default DictionaryPage;
