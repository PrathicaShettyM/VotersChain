// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        address votedFor;
    }

    struct Candidate {
        string name;
        string party;
        address candidateAddress;
        uint voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    mapping(address => Candidate) public candidates;
    address[] public candidateAddresses;

    enum ElectionStatus { UPCOMING, ONGOING, COMPLETED }
    ElectionStatus public electionStatus;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionOngoing() {
        require(electionStatus == ElectionStatus.ONGOING, "Election is not ongoing");
        _;
    }

    constructor() {
        admin = msg.sender;
        electionStatus = ElectionStatus.UPCOMING;
    }

    function registerCandidate(address _candidateAddress, string memory _name, string memory _party) public onlyAdmin {
        require(candidates[_candidateAddress].candidateAddress == address(0), "Candidate already registered");
        candidates[_candidateAddress] = Candidate(_name, _party, _candidateAddress, 0);
        candidateAddresses.push(_candidateAddress);
    }

    function registerVoter(address _voterAddress) public onlyAdmin {
        require(!voters[_voterAddress].isRegistered, "Voter already registered");
        voters[_voterAddress] = Voter(true, false, address(0));
    }

    function startElection() public onlyAdmin {
        require(electionStatus == ElectionStatus.UPCOMING, "Cannot start election now");
        electionStatus = ElectionStatus.ONGOING;
    }

    function endElection() public onlyAdmin {
        require(electionStatus == ElectionStatus.ONGOING, "Cannot end election now");
        electionStatus = ElectionStatus.COMPLETED;
    }

    function vote(address _candidateAddress) public electionOngoing {
        Voter storage voter = voters[msg.sender];
        require(voter.isRegistered, "You are not a registered voter");
        require(!voter.hasVoted, "You have already voted");
        require(candidates[_candidateAddress].candidateAddress != address(0), "Invalid candidate");

        voter.hasVoted = true;
        voter.votedFor = _candidateAddress;
        candidates[_candidateAddress].voteCount++;
    }

    function getCandidateDetails(address _candidateAddress) public view returns (string memory, string memory, uint) {
        Candidate memory candidate = candidates[_candidateAddress];
        return (candidate.name, candidate.party, candidate.voteCount);
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidateAddresses;
    }
}
