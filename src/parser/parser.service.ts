import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ParserService {
    async getDataOzon(
        url = 'https://www.ozon.ru/category/tehnika-dlya-kuhni-10523/',
        location = 1,
    ): Promise<
        {
            seller: string;
            title: string;
            price: number;
        }[]
    > {
        const fullURL = url + `?page=${location}`;
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();

        await page.goto(fullURL, {
            waitUntil: 'networkidle2',
        });

        // click on sellers link
        // await page.click(
        //     '#layoutPage > div.sg8 > div.container.sg9 > div:nth-child(2) > div:nth-child(1) > aside > div:nth-child(15) > div:nth-child(2) > span',
        // );

        // get sellers, failed to implement
        // const response = page.waitForResponse((response) => {
        //     if (response.url().includes('getSearchFilterValues')) {
        //         console.log(response.json());
        //         return response.url().includes('getSearchFilterValues');
        //     }
        // });

        // parsing page
        const results = await page.evaluate(() => {
            const aProduct: {
                seller: string;
                title: string;
                price: number;
            }[] = [];

            document.querySelectorAll('.p3i.ip4').forEach((el) => {
                // get seller
                const sAdditionalProductInfo = el.querySelector(
                    'span.de0.ed0.e0d.e3d.tsBodyM.oi7',
                )?.textContent;
                const sSeller = sAdditionalProductInfo
                    .split('продавец')
                    .pop()
                    .trim();

                // get price
                let sPrice =
                    el.querySelector('.ui-s5.ui-s8.ui-t0')?.textContent;

                if (!sPrice) {
                    sPrice = el.querySelector('.ui-s5.ui-s8')?.textContent;
                }

                const vPrice = Number(
                    (sPrice || '').replace('₽', '').replace(/\s/g, '').trim(),
                );

                // data generation
                const data = {
                    seller: !sSeller ? 'none' : sSeller,
                    title: el.querySelector('a.tile-hover-target.n6i')
                        ?.textContent,
                    price: vPrice,
                };

                aProduct.push(data);
            });

            return aProduct;
        });

        await browser.close();
        return results;
    }
}
