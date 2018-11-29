const SummaryRepository = require('../repositories/SummaryRepository');

exports.postSummary = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated === true) {
        SummaryRepository.createSummary({
            title: req.body.title,
            description: req.body.description,
            text: req.body.text,
            rawText: req.body.rawText,
            imageSrc: req.body.imageSrc,
            authorId: req.user.id,
        }).then((data) => {
            return res.status(200).json(data)
        }).catch((error) => {
            return res.status(500).json(error)
        })
    } else {
        return res.status(500)
    }
};

exports.getAllSummaries = (req, res) => {
    SummaryRepository.getAllSummaries()
        .then((allSummaries) => {
            res.json(allSummaries)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getPaginationSummaries = (req, res) => {
    SummaryRepository.getPaginationSummaries(req.query.limit, req.query.offset)
        .then((paginationSummaries) => {
            res.json(paginationSummaries)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getPopularSummaries = (req, res) => {
    SummaryRepository.getPopularSummaries()
        .then((popularSummaries) => {
            res.json(popularSummaries)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getSummaryById = (req, res) => {
    SummaryRepository.getSummaryById(req.params.id)
        .then((summary) => {
            res.json(summary)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getAllAuthorSummaries = (req, res) => {
    SummaryRepository.getAllAuthorSummaries(req.user.id)
        .then((allAuthorSummaries) => {
            res.json(allAuthorSummaries)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.updateSummary = (req, res) => {
    SummaryRepository.updateSummary(req.params.id, req.body)
        .then((summary) => {
            res.json(summary)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.deleteSummary = (req, res) => {
    SummaryRepository.deleteSummary(req.body.id)
        .then((res) => {
            res.json({success: true})
        })
        .catch((error) => {
            res.json(error)
        })
};