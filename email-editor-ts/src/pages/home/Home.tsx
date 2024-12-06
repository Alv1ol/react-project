import { EmailEditor } from "../../email-editor/EmailEditor";
import { EmailList } from "../../email-list/EmailList";

export function Home() { 
    return( 
        <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr .6fr',
            padding: '1.5rem'
        }}>
            <EmailEditor/>
            <EmailList/>
        </div>
    )
}