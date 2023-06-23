export const loadGTAmerica = async () => {
    try {
        await figma.loadFontAsync({
          family: 'GT America',
          style: 'Regular'
        });
    
      } catch(err) {
        console.error(`Error: ${err}`);
    
      }
}

export const loadUnivers = async () => {
    try {
        await figma.loadFontAsync({
          family: 'Univers Next Pro',
          style: 'Light Condensed'
        });
    
      } catch(err) {
        console.error(`Error: ${err}`);
    
      }
}