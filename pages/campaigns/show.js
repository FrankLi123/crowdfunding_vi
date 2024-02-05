import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Button, Form, Input, Message} from 'semantic-ui-react';

class CampaignShow extends Component {

    //before compoenent rendered to the screen, run this
    static async getInitialProps(props){

        const campaign = Campaign(props.query.address);

        // get the summary about the current campaign on this page.
        const summary = await campaign.methods.getSummary().call();
        
        console.log(summary);
        
        return {

            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]

        };
    }

    renderCardLists(){
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        // list for displaying each Card
        const items = [
            {
                header : manager,
                meta: "Address of Manager",
                description: 'Manager created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}

            },{

                header: minimumContribution,
                meta:"Minimum Contribution (wei)",
                description:'The least amount of wei to contriute in order to be an approver'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request aims to get some money from contract, and such operations must be approved by approvers'
            },
            { // approversCount
                header: approversCount,
                meta : 'Number of Approvers',
                description: 'donater number that have already made the donation'

            }
        ];
        return  <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                {this.renderCardLists()}
            </Layout>
        )
        //    <Card.Group items={items}/>
        
    }
}

export default CampaignShow;