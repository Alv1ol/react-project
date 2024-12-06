export type TStyle = 'bold' | 'italic' | 'underline';

export const applyStyle = (type: TStyle, selectedText: string) => { 

    let formatText = selectedText;

    switch (type){
        case 'bold':
            formatText = '<b>' + selectedText + '</b>';
            break;
        case 'italic': 
            formatText = '<i>' + selectedText + '</i>';
            break;
        case 'underline': 
            formatText = '<u>' + selectedText + '</u>';
            break;
        default: 
            formatText = selectedText;
    }

    return formatText;
}