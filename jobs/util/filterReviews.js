import {franc} from 'franc';

export const filterReviews = (reviews, name) => {

    const langFilter = reviews.filter(item => {
        if (Array.isArray(item)){
            return item.filter(paragraph => {
                const lang = franc(paragraph.toString());
                if (lang=== 'eng' || lang == 'sco' || lang == 'swe') {
                    return paragraph;
                }
            });
        }
        else {
        const lang = franc(item.review.toString());
            console.log('language', lang, item.review);
            if (lang === 'eng' || lang == 'sco' || lang == 'swe') {
                return item;
            }
        }
        
    })
    console.log('language filtered out');
    console.log(langFilter);
    return langFilter.filter(item => {
        const keywords = [];
        keywords.push(name);
        if (name.replace(/\d+/g, '') !== '')
            keywords.push(name.replace(/\d+/g, '').trim());
        keywords.push(name.split(':')[0]);
        keywords.push('boxd.it');
        console.log(keywords);
        //If review is split into an array, just return it
        if (Array.isArray(item)){
            console.log('array item', item);
            return item.filter(paragraph => {
                const review = paragraph.review.toString().toLowerCase();
                return !keywords.some(keyword => review.includes(keyword.toLowerCase()));

            });
        
        }
        else {
            const reviewText = item.review.toString().toLowerCase();

            return !keywords.some(keyword => reviewText.includes(keyword.toLowerCase()));
        }
    
    });
}
