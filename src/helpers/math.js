export function hexToRgb(hex) {
    const alph = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
    let rgb = [];

    for (let i = 0; i < 6; i += 2) {

        const hexNumber = hex.substring(i, i + 2);
        let dec = 0;

        for (let j = 0; j < hexNumber.length; j++) {

            dec += parseInt(alph[hexNumber[j].toLowerCase()]) * Math.pow(16, hexNumber.length - j - 1);

        }

        rgb.push(dec);
    }

    return rgb;
}

export function betweenLinesAngle(line1, line2) {

    const num = (line1.A * line2.A + line1.B * line2.B);
    const delim = Math.sqrt(line1.A ** 2 + line1.B ** 2) * Math.sqrt(line2.A ** 2 + line2.B ** 2);

    const phiRadians = Math.acos(num / delim);

    return phiRadians * 180 / Math.PI;
}

export function findColorRange(angle, colorsAllocation) {

    for (let i = 0; i < colorsAllocation.length; i++) {
        if (colorsAllocation[i].angle > angle) {
            continue;
        }

        const nextAngleIndex = i < colorsAllocation.length - 1 ? i + 1 : 0;
        const nextAngle = i < colorsAllocation.length - 1 ? colorsAllocation[i + 1].angle : 360;

        if (colorsAllocation[i].angle <= angle && nextAngle >= angle) {

            return [
                {angle: colorsAllocation[i].angle, rgb: hexToRgb(colorsAllocation[i].value)},
                {angle: nextAngle, rgb: hexToRgb(colorsAllocation[nextAngleIndex].value)}
            ];

        }
    }

}
