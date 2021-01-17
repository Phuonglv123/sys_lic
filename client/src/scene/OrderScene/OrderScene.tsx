import React from "react";
import {RouteComponentProps} from "@reach/router";
import style from "./style.module.scss";
import utils from "../../types/utils";

import momoImg from '../../res/img/momo.png';
import zaloImg from '../../res/img/logozlp1.png';
import zlQr from '../../res/img/qr-scan-zlp.png'

export default function OrderScene(_: RouteComponentProps) {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <div className={style.OrderScene}>
            <div className={style.titleOrderScene}>
                <p>Payment Methods</p>
            </div>
            <div className={style.row}>
                <div className={style.col1}>
                    <div className={style.span1}>
                        <div>
                            <span>Information Order</span>
                        </div>
                        <div className={style.chooseOrder}>
                            <div className={style.radioBtn}>
                                <input id="oneMonth" type="radio" name="radio" className="hidden"/>
                                <label htmlFor="oneMonth" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"/>
                                    1 Month
                                </label>
                            </div>
                            <div>
                                <span>{utils.formatCurrencyVND(10000)}</span>
                            </div>
                        </div>
                        <div className={style.chooseOrder}>
                            <div className={style.radioBtn}>
                                <input id="twoMonth" type="radio" name="radio" className="hidden"/>
                                <label htmlFor="twoMonth" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"/>
                                    2 Months
                                </label>
                            </div>
                            <div>
                                <span>{utils.formatCurrencyVND(10000)}</span>
                            </div>
                        </div>
                        <div className={style.chooseOrder}>
                            <div className={style.radioBtn}>
                                <input id="threeMonth" type="radio" name="radio" className="hidden"/>
                                <label htmlFor="fourMonth" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"/>
                                    3 Months
                                </label>
                            </div>
                            <div>
                                <span>{utils.formatCurrencyVND(10000)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.span2}>
                        <div>
                            <span>Enter Promotion Code</span>
                        </div>
                        <div className={style.PromotionCode}>
                            <input type="text" placeholder="Recipient's username"/>
                            <button>Apply</button>
                        </div>
                    </div>
                    <div className={style.span3}>
                        <div>
                            <span>Information Payment</span>
                        </div>
                        <div className={style.InformationPayment}>
                            <div>
                                <span>Email:</span>
                                <span></span>
                            </div>
                            <div>
                                <span>Unit Price</span>
                                <span>{utils.formatCurrencyVND(10000)}</span>
                            </div>
                            <div>
                                <span>Date Renew</span>
                                <span>12/12/2022</span>
                            </div>
                            <hr/>
                            <div>
                                <span>Total</span>
                                <span>{utils.formatCurrencyVND(10000)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.col2}>
                    <div>
                        <span>Choose Payment Methods</span>
                    </div>
                    <div className={style.tabCustom}>
                        <div className="w-full">
                            <ul className={style.tab}>
                                <li className={style.tabItem}>
                                    <a className={style.tabLink}
                                       onClick={e => {
                                           e.preventDefault();
                                           setOpenTab(1);
                                       }}
                                       style={openTab === 1 ? {border: '2px solid blue'} : {border: "none"}}
                                    >
                                        <img src={zaloImg} alt=""/>
                                    </a>
                                </li>
                                <li className={style.tabItem}>
                                    <a className={style.tabLink}
                                       onClick={e => {
                                           e.preventDefault();
                                           setOpenTab(2);
                                       }}
                                       style={openTab === 2 ? {border: '2px solid blue'} : {border: "none"}}
                                    >
                                        <img src={momoImg} alt=""/>
                                    </a>
                                </li>
                            </ul>
                            <div
                                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <div>

                                            </div>
                                            <div>
                                                <div>
                                                    <h2>Thanh toán với <img src={zaloImg} alt=""
                                                                            style={{width: '100px'}}/> bằng mã QR</h2>
                                                </div>
                                                <div>
                                                    <h4>Hướng dẫn thanh toán </h4>
                                                    <ul>
                                                        <li>Bước 1: Mở ứng dụng ZaloPay</li>
                                                        <li>Bước 2: Chọn "Thanh Toán" <img src={zlQr} alt=""/> và quét
                                                            mã QR
                                                        </li>
                                                        <li>Bước 3: Xác nhận thanh toán ở ứng dụng</li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <p>
                                                Completely synergize resource taxing relationships via
                                                premier niche markets. Professionally cultivate one-to-one
                                                customer service with robust ideas.
                                                <br/>
                                                <br/>
                                                Dynamically innovate resource-leveling customer service for
                                                state of the art customer service.
                                            </p>
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                            <p>
                                                Efficiently unleash cross-media information without
                                                cross-media value. Quickly maximize timely deliverables for
                                                real-time schemas.
                                                <br/>
                                                <br/> Dramatically maintain clicks-and-mortar solutions
                                                without functional solutions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
