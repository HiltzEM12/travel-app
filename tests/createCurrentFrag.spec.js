import { createCurrentFrag } from '../src/client/js/weatherBit.js';

test("Output text should match the predicted output", async () => {

    const testArray = [{windspd: 5.5, wIcon: "c02d", temp: 66.3, feelsLike: 66.3, clouds: 28, desc: "Few clouds"}];
    const textResult = 'Current Weather: feels like 66.3 °F with few clouds';
    const res = await createCurrentFrag(testArray);

    expect(res.textContent).toBe(textResult);
});