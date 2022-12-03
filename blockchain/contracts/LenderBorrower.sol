// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract LenderBorrower is ERC721Holder, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _proposalId;

    /*
       This Enum stores the Status of any proposal/request. Using this to restrict the parameters to the few options available.
       requested - No crypto has been lent to the request. The NFT is still locked in this stage.
       Settled1 - The amount due for repayed, includes the principal sum + interest over it. The NFT will be released if the correct amount is transferred over.
       Settled2 - The amount due hasn't been repayed so the lender has claimed the NFT that was locked by the borrower.
       notSettled - The repayment period is either left, or if it has passed the lender hasn't claimed the amount yet.
       withDrawn - The Borrow request has been withdrawn by the lender.  
   */
    enum Status {
        requested,
        Settled1,
        Settled2,
        notSettled,
        withDrawn
    }

    /*
    Struct to store BorrowRequests. 
    */

    struct borrowRequest {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 repayMentPeriod;
        uint256 propasalId;
        Status currentStatus;
        address lender;
        uint256 timeTaken;
        address nft;
        uint256 tokenId;
    }
    mapping(uint256 => borrowRequest) public borrowRequests;
    mapping(address => uint256[]) public requestListByAddress; 

    constructor()  {}

    function startBorrowProposal(
        uint256 amount,
        uint256 interestRate,
        uint256 repayMentPeriod,
        address nft,
        uint256 tokenId
    ) public returns(uint256 proposalId){
        IERC721 currentNft = IERC721(nft);
        require(currentNft.ownerOf(tokenId)==msg.sender,"Sender is not the owner");

        _proposalId.increment();
        borrowRequests[_proposalId.current()] = borrowRequest(
            msg.sender,
            amount,
            interestRate,
            repayMentPeriod,
            _proposalId.current(),
            Status.requested,
            address(0x0),
            0,
            nft,
            tokenId
        );
        currentNft.safeTransferFrom(msg.sender, address(this), tokenId);
        requestListByAddress[msg.sender].push(_proposalId.current());
        return _proposalId.current();
    }
    function getTheProposals() external view returns(borrowRequest[] memory allBorrowRequests){
        uint256[] memory temporaryProposalId = requestListByAddress[msg.sender];
        borrowRequest[] memory _temporaryProposalList;
        for(uint256 i = 0; i < temporaryProposalId.length; ++i ){
            _temporaryProposalList[i]=borrowRequests[temporaryProposalId[i]];
        }
        return _temporaryProposalList;
    }

    function returnCurrentProposalId() external view returns(uint256 currentProposal){
    return _proposalId.current();
    }
    
    function  lendToProposal(uint256 _requiredProposalId ) public payable{
        require(msg.value>= borrowRequests[_requiredProposalId].amount,"Not enough amount lent");
        borrowRequests[_requiredProposalId].timeTaken = block.timestamp;
        borrowRequests[_requiredProposalId].lender = msg.sender;
        payable(borrowRequests[_requiredProposalId].borrower).transfer(msg.value);
    }

    function withDrawProposal(uint256 _requiredProposalId) external{
        require(msg.sender==borrowRequests[_requiredProposalId].borrower,"Only the person who made the request can withdraw it");
        require(borrowRequests[_requiredProposalId].currentStatus==Status.requested,"The current status of Proposal doesn't allow this");
        borrowRequests[_requiredProposalId].currentStatus = Status.withDrawn;
        IERC721(address(borrowRequests[_requiredProposalId].nft)).safeTransferFrom(address(this),borrowRequests[_requiredProposalId].lender,borrowRequests[_requiredProposalId].tokenId);

    }

    function claimNft(uint256 _requiredProposalId) external{
        require(msg.sender==borrowRequests[_requiredProposalId].lender,"Only the person who lent the money can claim this");
       IERC721(borrowRequests[_requiredProposalId].nft).safeTransferFrom(address(this),msg.sender,borrowRequests[_requiredProposalId].tokenId);
       borrowRequests[_requiredProposalId].currentStatus = Status.Settled2;
    }
    function calculateAmountDue(uint256 _requiredProposalId) internal view returns(uint256 _amountDue){
        uint256  principalAmount = borrowRequests[_requiredProposalId].amount;
        uint256 interest = borrowRequests[_requiredProposalId].interestRate;
        uint256 amountDue = (1+interest)/100 * principalAmount;
        return amountDue;
    }
    function repayAll(uint256 _requiredProposalId) external payable{
        (bool sent,) = borrowRequests[_requiredProposalId].lender.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
    }
}
