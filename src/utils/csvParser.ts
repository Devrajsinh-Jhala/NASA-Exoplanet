// utils/csvParser.ts

import csv from 'csv-parser';
import * as fs from 'fs';

export const parseCSV = async (filePath: string): Promise<{ [key: string]: string[] }> => {
    const data: { [key: string]: string[] } = {};

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row: any) => {
                Object.keys(row).forEach((key) => {
                    if (!data[key]) {
                        data[key] = [];
                    }
                    if (row[key] && !data[key].includes(row[key])) {
                        data[key].push(row[key]);
                    }
                });
            })
            .on('end', () => {
                resolve(data);
            })
            .on('error', (error: any) => {
                reject(error);
            });
    });
};
